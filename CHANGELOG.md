# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup
- TripAdvisorClient class with basic API methods
- TypeScript type definitions for all API responses
- Comprehensive test suite using Vitest
- ESLint configuration for code quality
- Build configuration using tsup
- Example usage and documentation

### Features

- `searchLocations()` - Search for locations by query
- `getLocationDetails()` - Get detailed information about a location
- `getReviews()` - Get reviews for a location
- `getPhotos()` - Get photos for a location
- `getNearbyLocations()` - Search for locations near coordinates
- `request()` - Make custom API requests

### Technical

- ES module support (`"type": "module"`)
- Full TypeScript support with strict type checking
- Modern Node.js features (ES2022 target)
- Comprehensive error handling
- Flexible configuration options
