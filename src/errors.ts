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
  static fromApiResponse(response: unknown): TripAdvisorError {
    const responseObj = response as Record<string, unknown>;
    if (responseObj?.error && typeof responseObj.error === 'object' && responseObj.error !== null) {
      const error = responseObj.error as Record<string, unknown>;
      return new TripAdvisorError(
        (error.message as string) || 'Unknown API error',
        error.code as number,
        error.type as string,
        true
      );
    }
    if (responseObj?.Message) {
      return new TripAdvisorError(
        responseObj.Message as string,
        responseObj.code as number,
        responseObj.type as string,
        true
      );
    }
    return new TripAdvisorError('Unknown API error', undefined, undefined, true);
  }

  /**
   * Check if response is an API error
   */
  static isApiError(response: unknown): boolean {
    const responseObj = response as Record<string, unknown>;
    return !!(responseObj?.error || responseObj?.Message);
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
