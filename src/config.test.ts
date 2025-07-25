import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TripAdvisorConfig } from './config.js';
import { ConfigManager } from './config.js';
import { ConfigurationError } from './errors.js';

// Mock environment variables
const originalEnv = process.env;

describe('ConfigManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  describe('constructor', () => {
    it('should create config with API key from constructor', () => {
      const config = new ConfigManager({ apiKey: 'test-key' });
      expect(config.getApiKey()).toBe('test-key');
    });

    it('should create config with API key from environment variable', () => {
      process.env.TRIPADVISOR_API_KEY = 'env-key';
      const config = new ConfigManager();
      expect(config.getApiKey()).toBe('env-key');
    });

    it('should create config with custom settings', () => {
      const customConfig: Partial<TripAdvisorConfig> = {
        apiKey: 'test-key',
        language: 'es',
        currency: 'EUR',
        timeout: 60000,
        retries: 5,
        retryDelay: 2000,
      };
      const config = new ConfigManager(customConfig);

      expect(config.getLanguage()).toBe('es');
      expect(config.getCurrency()).toBe('EUR');
      expect(config.getTimeout()).toBe(60000);
      expect(config.getRetries()).toBe(5);
      expect(config.getRetryDelay()).toBe(2000);
    });

    it('should use default values when not provided', () => {
      const config = new ConfigManager({ apiKey: 'test-key' });

      expect(config.getBaseUrl()).toBe('https://api.content.tripadvisor.com/api/v1');
      expect(config.getLanguage()).toBe('en');
      expect(config.getCurrency()).toBe('USD');
      expect(config.getTimeout()).toBe(30000);
      expect(config.getRetries()).toBe(3);
      expect(config.getRetryDelay()).toBe(1000);
    });

    it('should throw error when no API key is provided', () => {
      delete process.env.TRIPADVISOR_API_KEY;
      expect(() => new ConfigManager()).toThrow(ConfigurationError);
      expect(() => new ConfigManager()).toThrow('TripAdvisor API key is required');
    });

    it('should prioritize constructor API key over environment variable', () => {
      process.env.TRIPADVISOR_API_KEY = 'env-key';
      const config = new ConfigManager({ apiKey: 'constructor-key' });
      expect(config.getApiKey()).toBe('constructor-key');
    });
  });

  describe('getConfig', () => {
    it('should return a copy of the configuration', () => {
      const config = new ConfigManager({ apiKey: 'test-key' });
      const configCopy = config.getConfig();

      expect(configCopy).toEqual({
        apiKey: 'test-key',
        baseUrl: 'https://api.content.tripadvisor.com/api/v1',
        language: 'en',
        currency: 'USD',
        timeout: 30000,
        retries: 3,
        retryDelay: 1000,
      });

      // Verify it's a copy, not a reference
      configCopy.apiKey = 'modified';
      expect(config.getApiKey()).toBe('test-key');
    });
  });

  describe('updateConfig', () => {
    it('should update configuration with new values', () => {
      const config = new ConfigManager({ apiKey: 'test-key' });

      config.updateConfig({
        language: 'fr',
        currency: 'GBP',
        timeout: 45000,
      });

      expect(config.getLanguage()).toBe('fr');
      expect(config.getCurrency()).toBe('GBP');
      expect(config.getTimeout()).toBe(45000);
      expect(config.getApiKey()).toBe('test-key'); // Should remain unchanged
    });

    it('should validate API key when updating', () => {
      const config = new ConfigManager({ apiKey: 'test-key' });

      // Should work with valid API key
      config.updateConfig({ apiKey: 'new-key' });
      expect(config.getApiKey()).toBe('new-key');

      // Should throw error when removing API key
      expect(() => config.updateConfig({ apiKey: '' })).toThrow(ConfigurationError);
    });

    it('should preserve existing values when updating', () => {
      const config = new ConfigManager({
        apiKey: 'test-key',
        language: 'es',
        currency: 'EUR',
      });

      config.updateConfig({ timeout: 60000 });

      expect(config.getLanguage()).toBe('es');
      expect(config.getCurrency()).toBe('EUR');
      expect(config.getTimeout()).toBe(60000);
    });
  });

  describe('getter methods', () => {
    let config: ConfigManager;

    beforeEach(() => {
      config = new ConfigManager({ apiKey: 'test-key' });
    });

    it('should return correct API key', () => {
      expect(config.getApiKey()).toBe('test-key');
    });

    it('should return correct base URL', () => {
      expect(config.getBaseUrl()).toBe('https://api.content.tripadvisor.com/api/v1');
    });

    it('should return correct language', () => {
      expect(config.getLanguage()).toBe('en');
    });

    it('should return correct currency', () => {
      expect(config.getCurrency()).toBe('USD');
    });

    it('should return correct timeout', () => {
      expect(config.getTimeout()).toBe(30000);
    });

    it('should return correct retries', () => {
      expect(config.getRetries()).toBe(3);
    });

    it('should return correct retry delay', () => {
      expect(config.getRetryDelay()).toBe(1000);
    });
  });
});
