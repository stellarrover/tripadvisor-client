import { z } from 'zod';

/**
 * TripAdvisor API error response schema
 */
export const TripAdvisorErrorSchema = z.union([
  z.object({
    error: z.object({
      message: z.string(),
      type: z.string().optional(),
      code: z.number().optional(),
    }),
  }),
  z.object({
    Message: z.string(),
    type: z.string().optional(),
    code: z.number().optional(),
  }),
]);

/**
 * TripAdvisor image schema
 */
export const TripadvisorImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

/**
 * TripAdvisor category enum
 */
export const TripAdvisorCategorySchema = z.enum(['hotels', 'attractions', 'restaurants', 'geos']);

/**
 * Name schema
 */
export const NameSchema = z.object({
  name: z.string(),
  localized_name: z.string(),
});

/**
 * String array schema
 */
export const ArrayStringSchema = z.array(z.string()).describe('An array of strings');

/**
 * Address object schema
 */
export const AddressObjectSchema = z
  .object({
    street1: z.string().describe('The street name').optional(),
    street2: z.string().describe('The street name continuation').optional(),
    city: z.string().describe('The city name'),
    state: z.string().describe('The state'),
    country: z.string().describe('The country'),
    postalcode: z.string().describe('The address postal code').optional(),
    address_string: z.string().describe('The address in one single sentence').optional(),
  })
  .describe('Object containing address data for this location');

/**
 * Ancestor location schema
 */
export const AncestorSchema = z.object({
  abbrv: z.string().describe('The ancestor location abbreviation').optional(),
  level: z.string().describe('The ancestor location level in relation to the location'),
  name: z.string().describe('The ancestor location name'),
  location_id: z.string().describe('The ancestor location location identifier'),
});

/**
 * Period schema
 */
export const PeriodSchema = z.object({
  day: z.number(),
  time: z.string(),
});

// Export types
export type TripAdvisorCategory = z.infer<typeof TripAdvisorCategorySchema>;
export type TripAdvisorError = z.infer<typeof TripAdvisorErrorSchema>;
export type TripadvisorImage = z.infer<typeof TripadvisorImageSchema>;
export type Name = z.infer<typeof NameSchema>;
export type AddressObject = z.infer<typeof AddressObjectSchema>;
export type Ancestor = z.infer<typeof AncestorSchema>;
export type Period = z.infer<typeof PeriodSchema>;
