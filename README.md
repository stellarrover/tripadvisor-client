# TripAdvisor Client

A comprehensive TypeScript client library for TripAdvisor Content API. Built to address the lack of official SDK and unreliable field type documentation.

## ✨ Features

- **🔒 Type Safety**: Full TypeScript support with comprehensive type definitions
- **📦 Modular Architecture**: Clean, modular codebase for easy maintenance
- **🛡️ Error Handling**: Robust error handling with custom error classes
- **⚡ Performance**: Optimized HTTP client with retry logic and timeout handling
- **🔧 Configurable**: Flexible configuration options for different use cases
- **📚 Well Documented**: Comprehensive JSDoc documentation and examples

## 🚀 Quick Start

### Installation

```bash
npm install tripadvisor-client
```

### Basic Usage

```typescript
import { TripAdvisorClient } from 'tripadvisor-client';

// Create client instance
const client = new TripAdvisorClient({
  apiKey: 'your-api-key',
});

// Search for locations
const locations = await client.locationSearch({
  searchQuery: 'Eiffel Tower',
  category: 'attractions',
});

// Get location details
const details = await client.locationDetails(
  '12345',
  {
    language: 'en',
    currency: 'USD',
  },
  'attractions'
);

// Get reviews
const reviews = await client.locationReviews('12345', {
  language: 'en',
  limit: 10,
});

// Get photos
const photos = await client.locationPhotos('12345', 20);
```

## 📖 API Reference

### TripAdvisorClient

The main client class for interacting with TripAdvisor API.

#### Constructor

```typescript
new TripAdvisorClient(config?: Partial<TripAdvisorConfig>)
```

**Configuration Options:**

- `apiKey` (required): Your TripAdvisor API key
- `baseUrl` (optional): API base URL (default: `https://api.content.tripadvisor.com/api/v1`)
- `language` (optional): Default language (default: `'en'`)
- `currency` (optional): Default currency (default: `'USD'`)
- `timeout` (optional): Request timeout in milliseconds (default: `30000`)
- `retries` (optional): Number of retry attempts (default: `3`)
- `retryDelay` (optional): Delay between retries in milliseconds (default: `1000`)

#### Methods

##### `locationSearch(payload: LocationSearchPayload): Promise<LocationSearchResult[]>`

Search for locations based on query parameters.

```typescript
const results = await client.locationSearch({
  searchQuery: 'Paris hotels',
  category: 'hotels',
  language: 'en',
  latLong: '48.8566,2.3522',
  radius: 10,
  radiusUnit: 'km',
});
```

##### `locationDetails(locationId: string, payload: LocationDetailsPayload, category?: TripAdvisorCategory): Promise<LocationDetailsResponse>`

Get detailed information about a specific location.

```typescript
// Type-safe hotel details
const hotelDetails = await client.locationDetails(
  '12345',
  {
    language: 'en',
    currency: 'USD',
  },
  'hotels'
);

// Generic location details
const locationDetails = await client.locationDetails('12345', {
  language: 'en',
});
```

##### `locationReviews(locationId: string, payload: LocationReviewsPayload): Promise<LocationReviewsResult[]>`

Get reviews for a specific location.

```typescript
const reviews = await client.locationReviews('12345', {
  language: 'en',
  limit: 10,
  offset: 0,
});
```

##### `locationPhotos(locationId: string, limit: number): Promise<LocationPhotosData[]>`

Get photos for a specific location.

```typescript
const photos = await client.locationPhotos('12345', 20);
```

##### `getConfig(): TripAdvisorConfig`

Get current client configuration.

##### `updateConfig(updates: Partial<TripAdvisorConfig>): void`

Update client configuration.

```typescript
client.updateConfig({
  language: 'es',
  currency: 'EUR',
});
```

## 🏗️ Architecture

The library is built with a modular architecture for maintainability and extensibility:

```
src/
├── index.ts              # Main entry point
├── client.ts             # Main client class
├── config.ts             # Configuration management
├── errors.ts             # Custom error classes
├── http-client.ts        # HTTP client with retry logic
└── types/                # Type definitions
    ├── index.ts          # Type exports
    ├── common.ts         # Common types
    ├── search.ts         # Search-related types
    ├── details.ts        # Details-related types
    ├── reviews.ts        # Reviews-related types
    └── photos.ts         # Photos-related types
```

## 🛡️ Error Handling

The library provides custom error classes for better error handling:

```typescript
import { TripAdvisorError, ConfigurationError, ValidationError } from 'tripadvisor-client';

try {
  const results = await client.locationSearch({ searchQuery: 'test' });
} catch (error) {
  if (error instanceof TripAdvisorError) {
    console.error('API Error:', error.message, error.code);
  } else if (error instanceof ConfigurationError) {
    console.error('Configuration Error:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Validation Error:', error.message);
  }
}
```

## 🔧 Configuration

### Environment Variables

You can set the API key using environment variables:

```bash
export TRIPADVISOR_API_KEY="your-api-key"
```

### Default Client

A default client instance is exported for convenience:

```typescript
import { tripAdvisorClient } from 'tripadvisor-client';

// Uses TRIPADVISOR_API_KEY environment variable
const results = await tripAdvisorClient.locationSearch({
  searchQuery: 'Eiffel Tower',
});
```

## 📝 Examples

See the `examples/` directory for more detailed usage examples:

- `basic-usage.js` - Basic usage examples
- `advanced-usage.ts` - Advanced usage with error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set your API key: `export TRIPADVISOR_API_KEY="your-key"`
4. Run tests: `npm test`
5. Build: `npm run build`

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Vitest** - Testing

Run quality checks:

```bash
npm run check-all  # Run all checks
npm run lint       # Lint code
npm run format     # Format code
npm run test       # Run tests
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [TripAdvisor Content API Documentation](https://developer-tripadvisor.com/content-api/)
- [GitHub Repository](https://github.com/stellarrover/tripadvisor-client)
- [npm Package](https://www.npmjs.com/package/tripadvisor-client)
