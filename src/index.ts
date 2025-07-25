// Main entry file
export { TripAdvisorClient, tripAdvisorClient } from './client.js';

// Export types
export type {
  LocationDetailsAttractionResponse,
  LocationDetailsGeosResponse,
  LocationDetailsHotelResponse,
  LocationDetailsPayload,
  LocationDetailsResponse,
  LocationDetailsRestaurantResponse,
  LocationPhotosData,
  LocationReviewsPayload,
  LocationReviewsResult,
  LocationSearchPayload,
  LocationSearchResult,
  TripAdvisorCategory,
} from './types/index.js';

// Export error classes
export { ConfigurationError, TripAdvisorError, ValidationError } from './errors.js';

// Export configuration types
export type { TripAdvisorConfig } from './config.js';
