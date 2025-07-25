import { z } from 'zod';
import { AddressObjectSchema, TripAdvisorCategorySchema, TripAdvisorErrorSchema } from './common.js';

/**
 * Location search request parameters schema
 */
export const LocationSearchPayloadSchema = z.object({
  searchQuery: z.string().describe('Text to use for searching based on the name of the location'),
  category: TripAdvisorCategorySchema.optional().describe(
    'Filters result set based on property type. Valid options are "hotels", "attractions", "restaurants", and "geos"'
  ),
  phone: z
    .string()
    .optional()
    .describe(
      'Phone number to filter the search results by (this can be in any format with spaces and dashes but without the "+" sign at the beginning)'
    ),
  address: z.string().optional().describe('Address to filter the search results by'),
  latLong: z
    .string()
    .optional()
    .describe('Latitude/Longitude pair to scope down the search around a specific point - eg. "42.3455,-71.10767"'),
  radius: z
    .number()
    .min(0)
    .optional()
    .describe('Length of the radius from the provided latitude/longitude pair to filter results.'),
  radiusUnit: z
    .string()
    .optional()
    .describe('Unit for length of the radius. Valid options are "km", "mi", "m" (km=kilometers, mi=miles, m=meters)'),
  language: z
    .string()
    .optional()
    .describe(
      "The language in which to return results (e.g. 'en' for English or 'es' for Spanish) from the list of our Supported Languages."
    )
    .default('en'),
});

/**
 * Location search result data schema
 */
export const LocationSearchResponseDataSchema = z.object({
  location_id: z
    .string()
    .describe(
      'A unique identifier for a location on Tripadvisor. This is to be used in the other endpoints that require a location ID.'
    ),
  name: z.string().describe('Name of the location'),
  distance: z
    .string()
    .describe('Distance, in miles, this location is from the passed in LatLong parameters')
    .optional(),
  bearing: z.string().describe('Direction this location is from the passed in LatLong parameters').optional(),
  address_obj: AddressObjectSchema,
});

/**
 * Location search response schema
 */
export const LocationSearchResponseSchema = z.union([
  z.object({ data: LocationSearchResponseDataSchema.array() }),
  TripAdvisorErrorSchema,
]);

// Export types
export type LocationSearchPayload = z.infer<typeof LocationSearchPayloadSchema>;
export type LocationSearchResult = z.infer<typeof LocationSearchResponseDataSchema>;
