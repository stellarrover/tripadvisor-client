import { z } from 'zod';
import { TripAdvisorErrorSchema } from './common.js';

/**
 * TripAdvisor review schema
 */
export const TripAdvisorReviewSchema = z.object({
  id: z.string().describe('The Tripadvisor ID for the review.'),
  lang: z.string().describe('The language of the review.'),
  text: z.string().describe('The travel date of the review'),
  title: z.string().describe('The title of this review.'),
  published_date: z.string().describe('The date the review was published to Tripadvisor.'),
});

/**
 * TripAdvisor user schema
 */
export const TripAdvisorUserSchema = z.object({
  username: z.string().describe('The username that appears on the Tripadvisor website for the user'),
  user_location: z.object({
    id: z.string(),
    location: z.string().optional(),
  }),
  review_count: z.number().optional(),
  reviewer_badge: z
    .string()
    .optional()
    .describe('The Reviewer Badge that appears on the Tripadvisor website for the user'),
  avatar: z
    .object({
      thumbnail: z.string(),
      small: z.string(),
      medium: z.string(),
      large: z.string(),
      original: z.string(),
    })
    .optional(),
});

/**
 * Location reviews request parameters schema
 */
export const LocationReviewsPayloadSchema = z.object({
  language: z
    .string()
    .optional()
    .describe(
      'The language in which to return results (e.g. "en" for English or "es" for Spanish) from the list of our Supported Languages.'
    ),
  limit: z.number().optional().describe('The number of reviews to return'),
  offset: z.number().optional().describe('The offset of the reviews to return'),
});

/**
 * Location reviews data schema
 */
export const LocationReviewsDataSchema = TripAdvisorReviewSchema.extend({
  location_id: z.string().describe('Unique Tripadvisor location ID of the destination or POI.'),
  rating: z
    .string()
    .describe(
      'Overall rating for this POI. Not applicable to geographic locations. Rating levels are defined as follows: (5: Excellent, 4: Very good, 3: Average, 2: Poor, 1: Terrible)'
    ),
  helpful_votes: z.number().describe('The number of helpful votes'),
  rating_image_url: z.string().describe('The URL to the bubble rating image for this location.'),
  url: z.string().describe('The URL to the review'),
  trip_type: z.string().describe('The Trip type of the review (Business, Couples, Family, Friends, Solo).'),
  travel_date: z.string().describe('The travel date of the review'),
  owner_response: TripAdvisorReviewSchema.extend({
    author: z.string().describe('The owners name. '),
  }).optional(),
  is_machine_translated: z
    .boolean()
    .describe(
      'True or false depending on whether this is a machine-translated review. (Outputs only if partner configured for inclusion of machine-translated reviews)'
    )
    .optional(),
  user: TripAdvisorUserSchema,
  subratings: z.any().optional(),
});

/**
 * Location reviews response schema
 */
export const LocationReviewsResponseSchema = z.union([
  z.object({ data: LocationReviewsDataSchema.array() }),
  TripAdvisorErrorSchema,
]);

// Export types
export type LocationReviewsPayload = z.infer<typeof LocationReviewsPayloadSchema>;
export type LocationReviewsResult = z.infer<typeof LocationReviewsDataSchema>;
export type TripAdvisorReview = z.infer<typeof TripAdvisorReviewSchema>;
export type TripAdvisorUser = z.infer<typeof TripAdvisorUserSchema>;
