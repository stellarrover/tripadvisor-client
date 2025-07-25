import { TripAdvisorClient, TripAdvisorError } from '../src/index.js';

/**
 * Advanced usage example
 *
 * Demonstrates how to use the refactored TripAdvisor client
 */

async function main() {
  // Create client instance
  const client = new TripAdvisorClient({
    apiKey: process.env.TRIPADVISOR_API_KEY!,
    language: 'en',
    currency: 'USD',
    timeout: 30000,
    retries: 3,
  });

  try {
    console.log('🔍 Searching for locations...');

    // Search for locations
    const searchResults = await client.locationSearch({
      searchQuery: 'Eiffel Tower',
      category: 'attractions',
      language: 'en',
    });

    console.log(`Found ${searchResults.length} locations:`);
    searchResults.forEach((location, index) => {
      console.log(`${index + 1}. ${location.name} (ID: ${location.location_id})`);
    });

    if (searchResults.length > 0) {
      const firstLocation = searchResults[0];

      console.log('\n📋 Getting location details...');

      // Get location details
      const details = await client.locationDetails(
        firstLocation.location_id,
        {
          language: 'en',
          currency: 'USD',
        },
        'attractions' // Type-safe category
      );

      console.log(`Location name: ${details.name}`);
      console.log(`Rating: ${details.rating || 'N/A'}`);
      console.log(`Number of reviews: ${details.num_reviews || 'N/A'}`);
      console.log(`Address: ${details.address_obj.address_string || 'N/A'}`);

      console.log('\n💬 Getting reviews...');

      // Get reviews
      const reviews = await client.locationReviews(firstLocation.location_id, {
        language: 'en',
        limit: 5,
        offset: 0,
      });

      console.log(`Retrieved ${reviews.length} reviews:`);
      reviews.forEach((review, index) => {
        console.log(`${index + 1}. ${review.title} (Rating: ${review.rating})`);
        console.log(`   Author: ${review.user.username}`);
        console.log(`   Content: ${review.text.substring(0, 100)}...`);
        console.log('');
      });

      console.log('📸 Getting photos...');

      // Get photos
      const photos = await client.locationPhotos(firstLocation.location_id, 5);

      console.log(`Retrieved ${photos.length} photos:`);
      photos.forEach((photo, index) => {
        console.log(`${index + 1}. ${photo.caption || 'No title'}`);
        console.log(`   Album: ${photo.album}`);
        console.log(`   Published date: ${photo.published_date}`);
        console.log('');
      });

      // Demonstrate configuration update
      console.log('⚙️ Updating configuration...');
      client.updateConfig({
        language: 'es',
        currency: 'EUR',
      });

      console.log('Current configuration:', client.getConfig());
    }
  } catch (error) {
    if (error instanceof TripAdvisorError) {
      console.error('TripAdvisor API error:', {
        message: error.message,
        code: error.code,
        type: error.type,
        isApiError: error.isApiError,
      });
    } else {
      console.error('Other error:', error);
    }
  }
}

// Run example
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
