import { describe, expect, it } from 'vitest';
import { ConfigurationError, TripAdvisorError, ValidationError } from './errors.js';

describe('TripAdvisorError', () => {
  describe('constructor', () => {
    it('should create error with basic message', () => {
      const error = new TripAdvisorError('Test error message');

      expect(error.message).toBe('Test error message');
      expect(error.name).toBe('TripAdvisorError');
      expect(error.code).toBeUndefined();
      expect(error.type).toBeUndefined();
      expect(error.isApiError).toBe(false);
    });

    it('should create error with all parameters', () => {
      const error = new TripAdvisorError('Test error', 400, 'BAD_REQUEST', true);

      expect(error.message).toBe('Test error');
      expect(error.name).toBe('TripAdvisorError');
      expect(error.code).toBe(400);
      expect(error.type).toBe('BAD_REQUEST');
      expect(error.isApiError).toBe(true);
    });

    it('should create error with code and type but not API error', () => {
      const error = new TripAdvisorError('Test error', 500, 'INTERNAL_ERROR', false);

      expect(error.message).toBe('Test error');
      expect(error.code).toBe(500);
      expect(error.type).toBe('INTERNAL_ERROR');
      expect(error.isApiError).toBe(false);
    });
  });

  describe('fromApiResponse', () => {
    it('should create error from response with error object', () => {
      const response = {
        error: {
          message: 'API error message',
          code: 401,
          type: 'UNAUTHORIZED',
        },
      };

      const error = TripAdvisorError.fromApiResponse(response);

      expect(error.message).toBe('API error message');
      expect(error.code).toBe(401);
      expect(error.type).toBe('UNAUTHORIZED');
      expect(error.isApiError).toBe(true);
    });

    it('should create error from response with Message property', () => {
      const response = {
        Message: 'Alternative error message',
        code: 404,
        type: 'NOT_FOUND',
      };

      const error = TripAdvisorError.fromApiResponse(response);

      expect(error.message).toBe('Alternative error message');
      expect(error.code).toBe(404);
      expect(error.type).toBe('NOT_FOUND');
      expect(error.isApiError).toBe(true);
    });

    it('should create error from response with error object but no message', () => {
      const response = {
        error: {
          code: 500,
          type: 'INTERNAL_ERROR',
        },
      };

      const error = TripAdvisorError.fromApiResponse(response);

      expect(error.message).toBe('Unknown API error');
      expect(error.code).toBe(500);
      expect(error.type).toBe('INTERNAL_ERROR');
      expect(error.isApiError).toBe(true);
    });

    it('should create error from response with Message but no code/type', () => {
      const response = {
        Message: 'Simple error message',
      };

      const error = TripAdvisorError.fromApiResponse(response);

      expect(error.message).toBe('Simple error message');
      expect(error.code).toBeUndefined();
      expect(error.type).toBeUndefined();
      expect(error.isApiError).toBe(true);
    });

    it('should create generic error for unknown response format', () => {
      const response = { someOtherProperty: 'value' };

      const error = TripAdvisorError.fromApiResponse(response);

      expect(error.message).toBe('Unknown API error');
      expect(error.code).toBeUndefined();
      expect(error.type).toBeUndefined();
      expect(error.isApiError).toBe(true);
    });

    it('should handle null/undefined response', () => {
      const error = TripAdvisorError.fromApiResponse(null);

      expect(error.message).toBe('Unknown API error');
      expect(error.code).toBeUndefined();
      expect(error.type).toBeUndefined();
      expect(error.isApiError).toBe(true);
    });
  });

  describe('isApiError', () => {
    it('should return true for response with error object', () => {
      const response = {
        error: {
          message: 'API error message',
          code: 400,
        },
      };

      expect(TripAdvisorError.isApiError(response)).toBe(true);
    });

    it('should return true for response with Message property', () => {
      const response = {
        Message: 'Alternative error message',
        code: 404,
      };

      expect(TripAdvisorError.isApiError(response)).toBe(true);
    });

    it('should return false for response without error indicators', () => {
      const response = {
        data: 'success data',
        status: 200,
      };

      expect(TripAdvisorError.isApiError(response)).toBe(false);
    });

    it('should return false for null/undefined response', () => {
      expect(TripAdvisorError.isApiError(null)).toBe(false);
      expect(TripAdvisorError.isApiError(undefined)).toBe(false);
    });

    it('should return false for empty object', () => {
      expect(TripAdvisorError.isApiError({})).toBe(false);
    });
  });
});

describe('ConfigurationError', () => {
  it('should create configuration error with message', () => {
    const error = new ConfigurationError('Configuration is invalid');

    expect(error.message).toBe('Configuration is invalid');
    expect(error.name).toBe('ConfigurationError');
  });

  it('should create configuration error with empty message', () => {
    const error = new ConfigurationError('');

    expect(error.message).toBe('');
    expect(error.name).toBe('ConfigurationError');
  });
});

describe('ValidationError', () => {
  it('should create validation error with message', () => {
    const error = new ValidationError('Validation failed');

    expect(error.message).toBe('Validation failed');
    expect(error.name).toBe('ValidationError');
  });

  it('should create validation error with empty message', () => {
    const error = new ValidationError('');

    expect(error.message).toBe('');
    expect(error.name).toBe('ValidationError');
  });
});
