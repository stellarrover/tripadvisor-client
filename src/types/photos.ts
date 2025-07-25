import { z } from 'zod';
import { NameSchema, TripAdvisorErrorSchema, TripadvisorImageSchema } from './common.js';

/**
 * Location photo image schema
 */
export const LocationPhotosImageSchema = z.object({
  thumbnail: TripadvisorImageSchema.optional(),
  small: TripadvisorImageSchema.optional(),
  medium: TripadvisorImageSchema.optional(),
  large: TripadvisorImageSchema.optional(),
  original: TripadvisorImageSchema.optional(),
});

/**
 * Location photo data schema
 */
export const LocationPhotosDataSchema = z.object({
  id: z.string().describe('A unique ID for this photo'),
  is_blessed: z
    .boolean()
    .describe(
      'Boolean whether or not this photo is blessed, i.e. reviewed at Tripadvisor as being a photo of exceptional quality'
    ),
  album: z.string().describe('Name of the album the photo is featured in'),
  caption: z.string().describe('The caption of the photo'),
  published_date: z.string().describe('Date when this photo was published to Tripadvisor'),
  images: LocationPhotosImageSchema,
  source: NameSchema,
  user: z.any(),
});

/**
 * Location photo response schema
 */
export const LocationPhotosResponseSchema = z.union([
  z.object({ data: LocationPhotosDataSchema.array() }),
  TripAdvisorErrorSchema,
]);

// Export types
export type LocationPhotosResponse = z.infer<typeof LocationPhotosResponseSchema>;
export type LocationPhotosData = z.infer<typeof LocationPhotosDataSchema>;
export type LocationPhotosImage = z.infer<typeof LocationPhotosImageSchema>;
