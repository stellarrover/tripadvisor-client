import { TripAdvisorClient } from "../dist/index.js";

// Initialize the client
const client = new TripAdvisorClient({
  apiKey: "your-api-key-here",
});

async function main() {
  try {
    // Search for locations
    console.log("Searching for locations...");
    const searchResults = await client.searchLocations("Paris", {
      language: "en",
      currency: "USD",
    });
    console.log("Search results:", searchResults);

    if (searchResults.data.length > 0) {
      const firstLocation = searchResults.data[0];

      // Get location details
      console.log("\nGetting location details...");
      const locationDetails = await client.getLocationDetails(
        firstLocation.location_id
      );
      console.log("Location details:", locationDetails);

      // Get reviews
      console.log("\nGetting reviews...");
      const reviews = await client.getReviews(firstLocation.location_id, {
        limit: 5,
        offset: 0,
      });
      console.log("Reviews:", reviews);

      // Get photos
      console.log("\nGetting photos...");
      const photos = await client.getPhotos(firstLocation.location_id, {
        limit: 3,
        offset: 0,
      });
      console.log("Photos:", photos);
    }

    // Search for nearby locations
    console.log("\nSearching for nearby locations...");
    const nearbyLocations = await client.getNearbyLocations(
      48.8566,
      2.3522,
      10,
      {
        language: "en",
        units: "km",
      }
    );
    console.log("Nearby locations:", nearbyLocations);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
