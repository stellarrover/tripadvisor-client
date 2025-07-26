# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **BREAKING**: Removed automatic NPM publishing from CI/CD pipeline
- Updated GitHub Actions workflow to separate CI and publishing concerns
- Added manual release workflow with automatic version bumping and tagging
- Updated `prepublishOnly` script to remove redundant test execution (tests now run in CI)

### Added

- New `Publish to NPM` workflow for manual releases
- Support for semantic versioning (patch/minor/major) via workflow inputs
- Automatic Git tag creation and GitHub Release generation
- Dry run mode for testing release process without actual publishing
- Comprehensive release documentation in `RELEASE.md`

### Removed

- Automatic publishing on main branch pushes
- Redundant test execution in `prepublishOnly` script

## [0.1.1] - 2024-01-XX

### Added

- Initial release of TripAdvisor Client library
- TypeScript support with comprehensive type definitions
- Location search functionality
- Location details retrieval
- Reviews and photos API endpoints
- Error handling and retry logic
- Comprehensive documentation and examples
