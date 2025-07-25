import { z } from 'zod';
import { ConfigManager } from './config.js';
import { TripAdvisorError, ValidationError } from './errors.js';

/**
 * HTTP request options
 */
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * HTTP response
 */
export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * HTTP client class
 */
export class HttpClient {
  private config: ConfigManager;

  constructor(config: ConfigManager) {
    this.config = config;
  }

  /**
   * Send HTTP request
   */
  async request<T extends z.ZodSchema>(
    endpoint: string,
    payload: Record<string, unknown>,
    payloadSchema: z.ZodSchema,
    responseSchema: T,
    options: RequestOptions = {}
  ): Promise<z.infer<T>> {
    const {
      method = 'GET',
      headers = {},
      timeout = this.config.getTimeout(),
      retries = this.config.getRetries(),
      retryDelay = this.config.getRetryDelay(),
    } = options;

    // Validate request payload
    let validatedPayload: Record<string, unknown>;
    try {
      validatedPayload = payloadSchema.parse(payload);
    } catch (error) {
      throw new ValidationError(`Invalid request payload: ${error}`);
    }

    // Build URL and parameters
    const url = this.buildUrl(endpoint, validatedPayload);
    const requestHeaders = this.buildHeaders(headers);

    // Send request (with retry)
    return this.sendWithRetry(url, method, requestHeaders, responseSchema, retries, retryDelay, timeout);
  }

  /**
   * Build complete URL
   */
  private buildUrl(endpoint: string, payload: Record<string, unknown>): string {
    const baseUrl = this.config.getBaseUrl();
    const params = new URLSearchParams();

    // Add API key
    params.append('key', this.config.getApiKey());

    // Add other parameters
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    return `${baseUrl}${endpoint}?${params.toString()}`;
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders: Record<string, string>): HeadersInit {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  }

  /**
   * Send request with retry
   */
  private async sendWithRetry<T extends z.ZodSchema>(
    url: string,
    method: string,
    headers: HeadersInit,
    responseSchema: T,
    retries: number,
    retryDelay: number,
    timeout: number
  ): Promise<z.infer<T>> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.sendRequest(url, method, headers, timeout);
        const data = await response.json();

        // Check if response is an API error
        if (TripAdvisorError.isApiError(data)) {
          throw TripAdvisorError.fromApiResponse(data);
        }

        // Validate response data
        try {
          return responseSchema.parse(data);
        } catch (error) {
          throw new ValidationError(`Invalid response format: ${error}`);
        }
      } catch (error) {
        lastError = error as Error;

        // If this is the last attempt, throw error
        if (attempt === retries) {
          break;
        }

        // If not a network error or timeout, don't retry
        if (!this.isRetryableError(error as Error)) {
          break;
        }

        // Wait before retrying
        await this.delay(retryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError!;
  }

  /**
   * Send single request
   */
  private async sendRequest(url: string, method: string, headers: HeadersInit, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Determine if error is retryable
   */
  private isRetryableError(error: Error): boolean {
    // Network errors, timeouts, 5xx server errors can be retried
    return (
      error.name === 'AbortError' ||
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('timeout') ||
      /^5\d{2}/.test(error.message)
    );
  }

  /**
   * Delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
