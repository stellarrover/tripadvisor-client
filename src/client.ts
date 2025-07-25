import { z } from 'zod';
import { ConfigManager, type TripAdvisorConfig } from './config.js';
import { TripAdvisorError } from './errors.js';
import { HttpClient } from './http-client.js';

// Import type definitions
import type { TripAdvisorCategory } from './types/common.js';
import type {
  LocationDetailsAttractionResponse,
  LocationDetailsGeosResponse,
  LocationDetailsHotelResponse,
  LocationDetailsPayload,
  LocationDetailsResponse,
  LocationDetailsRestaurantResponse,
} from './types/details.js';
import type { LocationPhotosData } from './types/photos.js';
import type { LocationReviewsPayload, LocationReviewsResult } from './types/reviews.js';
import type { LocationSearchPayload, LocationSearchResult } from './types/search.js';

// Import schemas
import { LocationDetailsPayloadSchema, LocationDetailsResponseSchema } from './types/details.js';
import { LocationPhotosResponseSchema } from './types/photos.js';
import { LocationReviewsPayloadSchema, LocationReviewsResponseSchema } from './types/reviews.js';
import { LocationSearchPayloadSchema, LocationSearchResponseSchema } from './types/search.js';

/**
 * Category response mapping type
 */
type CategoryResponseMap = {
  hotels: LocationDetailsHotelResponse;
  attractions: LocationDetailsAttractionResponse;
  restaurants: LocationDetailsRestaurantResponse;
  geos: LocationDetailsGeosResponse;
};

/**
 * TripAdvisor API Client Class
 *
 * Provides complete TripAdvisor Content API access functionality, including:
 * - Location search
 * - Location details retrieval
 * - Review retrieval
 * - Photo retrieval
 *
 * @example
 * ```typescript
 * import { TripAdvisorClient } from 'tripadvisor-client';
 *
 * const client = new TripAdvisorClient({
 *   apiKey: 'your-api-key'
 * });
 *
 * // Search for locations
 * const locations = await client.locationSearch({
 *   searchQuery: 'Eiffel Tower'
 * });
 *
 * // Get location details
 * const details = await client.locationDetails('12345', {
 *   language: 'en'
 * });
 * ```
 */
export class TripAdvisorClient {
  private config: ConfigManager;
  private httpClient: HttpClient;

  /**
   * Create TripAdvisor client instance
   *
   * @param config - Client configuration
   */
  constructor(config?: Partial<TripAdvisorConfig>) {
    this.config = new ConfigManager(config);
    this.httpClient = new HttpClient(this.config);
  }

  /**
   * Search for locations
   *
   * Returns up to 10 location results based on the search query.
   *
   * @param payload - Search parameters
   * @returns Array of location search results
   *
   * @example
   * ```typescript
   * const results = await client.locationSearch({
   *   searchQuery: 'Paris hotels',
   *   category: 'hotels',
   *   language: 'en'
   * });
   * ```
   */
  async locationSearch(payload: LocationSearchPayload): Promise<LocationSearchResult[]> {
    const result = await this.httpClient.request(
      '/location/search',
      payload,
      LocationSearchPayloadSchema,
      LocationSearchResponseSchema
    );

    if (!('data' in result)) {
      throw new TripAdvisorError('Invalid search response format');
    }

    return result.data;
  }

  /**
   * Get location details
   *
   * Returns detailed information about a location, including name, address, rating, and TripAdvisor links.
   *
   * @param locationId - Location ID
   * @param payload - Request parameters
   * @param category - Location category (optional, for type safety)
   * @returns Location details information
   *
   * @example
   * ```typescript
   * // Get hotel details
   * const hotelDetails = await client.locationDetails('12345', {
   *   language: 'en',
   *   currency: 'USD'
   * }, 'hotels');
   *
   * // Get restaurant details
   * const restaurantDetails = await client.locationDetails('67890', {
   *   language: 'en'
   * }, 'restaurants');
   * ```
   */
  async locationDetails<T extends TripAdvisorCategory>(
    locationId: string,
    payload: LocationDetailsPayload,
    category: T
  ): Promise<CategoryResponseMap[T]>;
  async locationDetails(locationId: string, payload: LocationDetailsPayload): Promise<LocationDetailsResponse>;
  async locationDetails(
    locationId: string,
    payload: LocationDetailsPayload,
    _category?: TripAdvisorCategory
  ): Promise<LocationDetailsResponse> {
    const result = await this.httpClient.request(
      `/location/${locationId}/details`,
      payload,
      LocationDetailsPayloadSchema,
      LocationDetailsResponseSchema
    );

    return result;
  }

  /**
   * Get location reviews
   *
   * Returns a list of reviews for the specified location.
   *
   * @param locationId - Location ID
   * @param payload - Request parameters
   * @returns Array of review results
   *
   * @example
   * ```typescript
   * const reviews = await client.locationReviews('12345', {
   *   language: 'en',
   *   limit: 10,
   *   offset: 0
   * });
   * ```
   */
  async locationReviews(locationId: string, payload: LocationReviewsPayload): Promise<LocationReviewsResult[]> {
    const result = await this.httpClient.request(
      `/location/${locationId}/reviews`,
      payload,
      LocationReviewsPayloadSchema,
      LocationReviewsResponseSchema
    );

    if (!('data' in result)) {
      throw new TripAdvisorError('Invalid reviews response format');
    }

    return result.data;
  }

  /**
   * Get location photos
   *
   * Returns a list of photos for the specified location.
   *
   * @param locationId - Location ID
   * @param limit - Photo count limit
   * @returns Array of photo data
   *
   * @example
   * ```typescript
   * const photos = await client.locationPhotos('12345', 20);
   * ```
   */
  async locationPhotos(locationId: string, limit: number): Promise<LocationPhotosData[]> {
    const result = await this.httpClient.request(
      `/location/${locationId}/photos`,
      { limit },
      z.object({ limit: z.number() }),
      LocationPhotosResponseSchema
    );

    if (!('data' in result)) {
      throw new TripAdvisorError('Invalid photos response format');
    }

    return result.data;
  }

  /**
   * Get client configuration
   *
   * @returns Copy of current configuration
   */
  getConfig(): TripAdvisorConfig {
    return this.config.getConfig();
  }

  /**
   * Update client configuration
   *
   * @param updates - Configuration updates
   */
  updateConfig(updates: Partial<TripAdvisorConfig>): void {
    this.config.updateConfig(updates);
  }
}

/**
 * Default client instance
 *
 * Uses TRIPADVISOR_API_KEY environment variable as API key
 */
export const tripAdvisorClient = new TripAdvisorClient();

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
