import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ConfigManager } from './config.js';
import { TripAdvisorError, ValidationError } from './errors.js';
import { HttpClient } from './http-client.js';

// Mock fetch globally
global.fetch = vi.fn();

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let mockConfig: ConfigManager;

  beforeEach(() => {
    vi.clearAllMocks();
    mockConfig = new ConfigManager({ apiKey: 'test-key' });
    httpClient = new HttpClient(mockConfig);
  });

  describe('constructor', () => {
    it('should create HttpClient with config', () => {
      expect(httpClient).toBeInstanceOf(HttpClient);
    });
  });

  describe('request', () => {
    const mockPayloadSchema = z.object({
      searchQuery: z.string(),
      language: z.string().optional(),
    });

    const mockResponseSchema = z.object({
      data: z.array(
        z.object({
          location_id: z.string(),
          name: z.string(),
        })
      ),
    });

    it('should make successful request', async () => {
      const mockResponse = {
        data: [{ location_id: '123', name: 'Test Location' }],
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(mockResponse),
      });

      const result = await httpClient.request(
        '/location/search',
        { searchQuery: 'test', language: 'en' },
        mockPayloadSchema,
        mockResponseSchema
      );

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.content.tripadvisor.com/api/v1/location/search'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should throw ValidationError for invalid payload', async () => {
      await expect(
        httpClient.request('/location/search', { invalidField: 'test' }, mockPayloadSchema, mockResponseSchema)
      ).rejects.toThrow(ValidationError);
    });

    it('should handle custom request options', async () => {
      const mockResponse = { data: [] };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve(mockResponse),
      });

      await httpClient.request('/location/search', { searchQuery: 'test' }, mockPayloadSchema, mockResponseSchema, {
        method: 'POST',
        headers: { 'Custom-Header': 'value' },
        timeout: 5000,
        retries: 2,
        retryDelay: 500,
      });

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Custom-Header': 'value',
          }),
        })
      );
    });

    it('should retry on retryable errors', async () => {
      const mockResponse = { data: [] };

      // First call fails, second succeeds
      (fetch as any).mockRejectedValueOnce(new Error('network error')).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve(mockResponse),
      });

      const result = await httpClient.request(
        '/location/search',
        { searchQuery: 'test' },
        mockPayloadSchema,
        mockResponseSchema,
        { retries: 1, retryDelay: 10 }
      );

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error after max retries', async () => {
      (fetch as any).mockRejectedValue(new Error('network error'));

      await expect(
        httpClient.request('/location/search', { searchQuery: 'test' }, mockPayloadSchema, mockResponseSchema, {
          retries: 2,
          retryDelay: 10,
        })
      ).rejects.toThrow('network error');

      expect(fetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should handle API error responses', async () => {
      const errorResponse = {
        error: {
          message: 'API Error',
          code: 400,
          type: 'BAD_REQUEST',
        },
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve(errorResponse),
      });

      await expect(
        httpClient.request('/location/search', { searchQuery: 'test' }, mockPayloadSchema, mockResponseSchema)
      ).rejects.toThrow(TripAdvisorError);
    });

    it('should handle non-JSON responses', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(
        httpClient.request('/location/search', { searchQuery: 'test' }, mockPayloadSchema, mockResponseSchema)
      ).rejects.toThrow();
    });

    it('should build URL with correct parameters', async () => {
      const mockResponse = { data: [] };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve(mockResponse),
      });

      const flexibleSchema = z.object({
        searchQuery: z.string(),
        language: z.string().optional(),
        currency: z.string().optional(),
      });

      await httpClient.request(
        '/location/search',
        {
          searchQuery: 'test location',
          language: 'en',
          currency: 'USD',
        },
        flexibleSchema,
        mockResponseSchema
      );

      const callUrl = (fetch as any).mock.calls[0][0];
      expect(callUrl).toContain('https://api.content.tripadvisor.com/api/v1/location/search');
      expect(callUrl).toContain('key=test-key');
      expect(callUrl).toContain('searchQuery=test+location');
      expect(callUrl).toContain('language=en');
      expect(callUrl).toContain('currency=USD');
    });

    it('should filter out undefined and null parameters', async () => {
      const mockResponse = { data: [] };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        json: () => Promise.resolve(mockResponse),
      });

      const flexibleSchema = z.object({
        searchQuery: z.string(),
        language: z.string().optional(),
        currency: z.string().nullable().optional(),
        validParam: z.string().optional(),
      });

      await httpClient.request(
        '/location/search',
        {
          searchQuery: 'test',
          language: undefined,
          currency: null,
          validParam: 'value',
        },
        flexibleSchema,
        mockResponseSchema
      );

      const callUrl = (fetch as any).mock.calls[0][0];
      expect(callUrl).toContain('searchQuery=test');
      expect(callUrl).toContain('validParam=value');
      expect(callUrl).not.toContain('language=');
      expect(callUrl).not.toContain('currency=');
    });
  });

  describe('error handling', () => {
    it('should handle timeout errors', async () => {
      const abortError = new Error('timeout');
      abortError.name = 'AbortError';
      (fetch as any).mockRejectedValue(abortError);

      await expect(
        httpClient.request(
          '/location/search',
          { searchQuery: 'test' },
          z.object({ searchQuery: z.string() }),
          z.object({ data: z.array(z.any()) })
        )
      ).rejects.toThrow('timeout');
    });

    it('should handle network errors', async () => {
      (fetch as any).mockRejectedValue(new Error('Network request failed'));

      await expect(
        httpClient.request(
          '/location/search',
          { searchQuery: 'test' },
          z.object({ searchQuery: z.string() }),
          z.object({ data: z.array(z.any()) })
        )
      ).rejects.toThrow('Network request failed');
    });
  });
});
