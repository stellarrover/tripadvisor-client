/**
 * TripAdvisor API error class
 */
export class TripAdvisorError extends Error {
  public readonly code?: number;
  public readonly type?: string;
  public readonly isApiError: boolean;

  constructor(message: string, code?: number, type?: string, isApiError = false) {
    super(message);
    this.name = 'TripAdvisorError';
    this.code = code;
    this.type = type;
    this.isApiError = isApiError;
  }

  /**
   * Create error instance from API response
   */
  static fromApiResponse(response: any): TripAdvisorError {
    if (response?.error) {
      return new TripAdvisorError(
        response.error.message || 'Unknown API error',
        response.error.code,
        response.error.type,
        true
      );
    }
    if (response?.Message) {
      return new TripAdvisorError(response.Message, response.code, response.type, true);
    }
    return new TripAdvisorError('Unknown API error', undefined, undefined, true);
  }

  /**
   * Check if response is an API error
   */
  static isApiError(response: any): boolean {
    return !!(response?.error || response?.Message);
  }
}

/**
 * Configuration error class
 */
export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
