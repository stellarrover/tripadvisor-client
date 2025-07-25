import { ConfigurationError } from './errors.js';

/**
 * TripAdvisor API configuration interface
 */
export interface TripAdvisorConfig {
  /** API key */
  apiKey: string;
  /** API base URL */
  baseUrl?: string;
  /** Default language */
  language?: string;
  /** Default currency */
  currency?: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Number of retries */
  retries?: number;
  /** Retry delay in milliseconds */
  retryDelay?: number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Partial<TripAdvisorConfig> = {
  baseUrl: 'https://api.content.tripadvisor.com/api/v1',
  language: 'en',
  currency: 'USD',
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};

/**
 * Configuration manager
 */
export class ConfigManager {
  private config: TripAdvisorConfig;

  constructor(config?: Partial<TripAdvisorConfig>) {
    this.config = this.validateAndMergeConfig(config);
  }

  /**
   * Validate and merge configuration
   */
  private validateAndMergeConfig(config?: Partial<TripAdvisorConfig>): TripAdvisorConfig {
    const apiKey = config?.apiKey || process.env.TRIPADVISOR_API_KEY;

    if (!apiKey) {
      throw new ConfigurationError(
        'TripAdvisor API key is required. Set TRIPADVISOR_API_KEY environment variable or pass apiKey in config.'
      );
    }

    return {
      ...DEFAULT_CONFIG,
      ...config,
      apiKey,
    } as TripAdvisorConfig;
  }

  /**
   * Get configuration
   */
  getConfig(): TripAdvisorConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<TripAdvisorConfig>): void {
    this.config = this.validateAndMergeConfig({ ...this.config, ...updates });
  }

  /**
   * Get API key
   */
  getApiKey(): string {
    return this.config.apiKey;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.config.baseUrl!;
  }

  /**
   * Get default language
   */
  getLanguage(): string {
    return this.config.language!;
  }

  /**
   * Get default currency
   */
  getCurrency(): string {
    return this.config.currency!;
  }

  /**
   * Get timeout
   */
  getTimeout(): number {
    return this.config.timeout!;
  }

  /**
   * Get retry count
   */
  getRetries(): number {
    return this.config.retries!;
  }

  /**
   * Get retry delay
   */
  getRetryDelay(): number {
    return this.config.retryDelay!;
  }
}
