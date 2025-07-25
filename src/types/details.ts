import { z } from 'zod';
import { AddressObjectSchema, AncestorSchema, ArrayStringSchema, NameSchema, PeriodSchema } from './common.js';

/**
 * Ranking data schema
 */
export const RankingDataSchema = z
  .object({
    geo_location_id: z.string().describe('The destination id'),
    ranking_string: z.string().describe('The description of the ranking'),
    geo_location_name: z.string().describe('The destination name'),
    ranking_out_of: z.string().describe('The total number of locations on the ranking score'),
    ranking: z.string().describe('The location ranking'),
  })
  .describe(
    "Describes a POI's Popularity Index ranking on Tripadvisor, which compares places of interest (accommodations, restaurants, and attractions) within the same destination based on their popularity."
  );

/**
 * Trip types schema
 */
export const TripTypesSchema = z
  .array(
    NameSchema.extend({
      value: z.string(),
    })
  )
  .describe('Each review submitted on Tripadvisor is tagged with a trip type, as designated by the reviewer.');

/**
 * Awards schema
 */
export const AwardsSchema = z
  .array(
    z.object({
      award_type: z.string().describe('Award type name'),
      year: z.string().describe('The year in which the award was awarded'),
      images: z.object({
        tiny: z.string().optional(),
        small: z.string().optional(),
        large: z.string().optional(),
      }),
      categories: ArrayStringSchema.describe('The categories in which the award was awarded'),
      display_name: z.string(),
    })
  )
  .describe(
    "Returns a list of all of the awards for this location, which could include Certificate of Excellence, Travelers' Choice, and Green Leader."
  );

/**
 * Location details request parameters schema
 */
export const LocationDetailsPayloadSchema = z.object({
  language: z
    .string()
    .optional()
    .describe(
      'The language in which to return results (e.g. "en" for English or "es" for Spanish) from the list of our Supported Languages.'
    )
    .default('en'),
  currency: z
    .string()
    .optional()
    .describe('The currency code to use for request and response (should follow ISO 4217).')
    .default('USD'),
});

/**
 * Location details base response schema
 */
export const LocationDetailsBaseResponseSchema = z.object({
  location_id: z.string().describe('Unique Tripadvisor location ID of the destination or POI'),
  name: z.string().describe('Name of the POI as listed on Tripadvisor'),
  web_url: z
    .string()
    .describe(
      'Link to the POI detail page on Tripadvisor. Link is localized to the correct domain if a language other than English is requested.'
    ),
  description: z.string().optional().describe('Description of the POI as listed on Tripadvisor'),
  address_obj: AddressObjectSchema,
  ancestors: AncestorSchema.array().describe(
    'Ancestors describe where the POI or destination lives within the Tripadvisor destination or geo hierarchy.'
  ),
  latitude: z.string().describe('The latitude of this location in degrees, if available'),
  longitude: z.string().describe('The longitude of this location in degrees, if available'),
  timezone: z.string().describe('The timezone of the location'),
  email: z.string().optional().describe('The email of the location, if available'),
  phone: z.string().optional().describe('The phone number of the location, if available'),
  website: z.string().optional().describe('The website of the location, if available'),
  write_review: z
    .string()
    .optional()
    .describe(
      'Link to the review form for this specific POI on Tripadvisor. Link is localized to the correct domain if a language other than English is requested.'
    ),
  ranking_data: RankingDataSchema.optional(),
  rating: z
    .string()
    .optional()
    .describe(
      'Overall rating for this POI. Not applicable to geographic locations. Rating levels are defined as follows: (5: Excellent, 4: Very good, 3: Average, 2: Poor, 1: Terrible)'
    ),
  rating_image_url: z
    .string()
    .optional()
    .describe(
      'URL to the bubble rating image for this location. Overall Bubble Ratings must be displayed using the Tripadvisor bubble rating image with the owl icon.'
    ),
  num_reviews: z.string().optional().describe('Count of total reviews published for this location'),
  review_rating_count: z
    .object({
      '1': z.string(),
      '2': z.string(),
      '3': z.string(),
      '4': z.string(),
      '5': z.string(),
    })
    .optional()
    .describe('Count of reviews for this location at each traveler rating level (1,2,3,4,5)'),
  subratings: z.any().optional(),
  photo_count: z.string().optional().describe('The count of photos for this POI published on Tripadvisor'),
  see_all_photos: z
    .string()
    .optional()
    .describe(
      'Link to open all photos posted for this POI in a photo viewer on Tripadvisor. Link is localized to the correct domain if a language other than English is requested.'
    ),
  price_level: z
    .string()
    .optional()
    .describe(
      'The relative price level for the POI. Not available for all POIs. This string is localized to other currency symbols if a language other than English (en_US) is requested or if a specific currency is selected.'
    ),
  category: NameSchema.describe(
    "Each POI on Tripadvisor is classified under a 'category' and 'subcategory', which is included in the API response."
  ),
  subcategory: z
    .array(NameSchema)
    .describe('Listings that are accommodations/hotels or restaurants are assigned a single subcategory.'),
  neighborhood_info: z
    .array(
      z.object({
        location_id: z.string(),
        name: z.string(),
      })
    )
    .describe('List of neighborhoods close to the location'),
  awards: AwardsSchema,
});

/**
 * Hotel details response schema
 */
export const LocationDetailsHotelResponseSchema = LocationDetailsBaseResponseSchema.extend({
  amenities: ArrayStringSchema.describe('The amenities provided by this hotel'),
  parent_brand: z.string().describe('The parent brand of this hotel'),
  brand: z.string().describe('The brand of this hotel'),
  styles: ArrayStringSchema.describe('The styles of the hotel'),
  trip_types: TripTypesSchema,
});

/**
 * Attraction details response schema
 */
export const LocationDetailsAttractionResponseSchema = LocationDetailsBaseResponseSchema.extend({
  hours: z
    .object({
      periods: z.array(
        z.object({
          open: PeriodSchema.describe('The day and times intervals in which the location is open'),
          close: PeriodSchema.describe('The day and times intervals in which the location is closed'),
        })
      ),
      weekday_text: ArrayStringSchema,
    })
    .optional()
    .describe('Provides localized opening hours for Restaurants and Attractions, using ISO 8601 format'),
  groups: z
    .array(
      NameSchema.extend({
        categories: z.array(NameSchema).describe('Attraction Categories'),
      })
    )
    .describe(
      'Hierarchical display of Attraction Groups and Categories. These fields are only applicable for location type "attraction".'
    ),
  trip_types: TripTypesSchema,
});

/**
 * Restaurant details response schema
 */
export const LocationDetailsRestaurantResponseSchema = LocationDetailsBaseResponseSchema.extend({
  hours: z
    .object({
      periods: z.array(
        z.object({
          open: PeriodSchema.describe('The day and times intervals in which the location is open'),
          close: PeriodSchema.describe('The day and times intervals in which the location is closed'),
        })
      ),
      weekday_text: ArrayStringSchema,
    })
    .optional()
    .describe('Provides localized opening hours for Restaurants and Attractions, using ISO 8601 format'),
  features: ArrayStringSchema.describe('The features provided by this restaurant'),
  cuisine: z.array(NameSchema).describe('The cuisines of this restaurant'),
  trip_types: TripTypesSchema,
});

/**
 * Geographic location details response schema
 */
export const LocationDetailsGeosResponseSchema = LocationDetailsBaseResponseSchema.extend({});

/**
 * Location details response schema
 */
export const LocationDetailsResponseSchema = z.union([
  LocationDetailsHotelResponseSchema,
  LocationDetailsAttractionResponseSchema,
  LocationDetailsRestaurantResponseSchema,
  LocationDetailsGeosResponseSchema,
]);

// Export types
export type LocationDetailsPayload = z.infer<typeof LocationDetailsPayloadSchema>;
export type LocationDetailsResponse = z.infer<typeof LocationDetailsResponseSchema>;
export type LocationDetailsHotelResponse = z.infer<typeof LocationDetailsHotelResponseSchema>;
export type LocationDetailsAttractionResponse = z.infer<typeof LocationDetailsAttractionResponseSchema>;
export type LocationDetailsRestaurantResponse = z.infer<typeof LocationDetailsRestaurantResponseSchema>;
export type LocationDetailsGeosResponse = z.infer<typeof LocationDetailsGeosResponseSchema>;
