# Contributing to TripAdvisor Client

Thank you for your interest in contributing to the TripAdvisor Client library! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/tripadvisor-client.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Make your changes
6. Run tests: `pnpm run check-all`
7. Commit your changes: `git commit -m "feat: add your feature"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Create a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Environment Variables

Create a `.env` file in the root directory:

```env
TRIPADVISOR_API_KEY=your_api_key_here
```

### Available Scripts

```bash
# Development
pnpm run dev          # Watch mode for development
pnpm run build        # Build the project
pnpm run clean        # Clean build artifacts

# Testing
pnpm run test         # Run tests in watch mode
pnpm run test:run     # Run tests once
pnpm run test:coverage # Run tests with coverage

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
pnpm run format       # Format code with Prettier
pnpm run format:check # Check code formatting
pnpm run spell-check  # Run spell checking
pnpm run type-check   # Run TypeScript type checking

# All checks
pnpm run check-all    # Run all quality checks
```

## Making Changes

### Code Style

- Follow the existing code style and formatting
- Use TypeScript for all new code
- Add JSDoc comments for public APIs
- Use meaningful variable and function names
- Keep functions small and focused

### Type Definitions

- All API types should be defined in the `src/types/` directory
- Use Zod schemas for runtime validation
- Export types from `src/types/index.ts`
- Keep types organized by domain (search, details, reviews, etc.)

### Error Handling

- Use custom error classes from `src/errors.ts`
- Provide meaningful error messages
- Include error codes when applicable
- Handle both API errors and validation errors

### Testing

- Write tests for all new functionality
- Use descriptive test names
- Mock external dependencies
- Aim for high test coverage
- Test both success and error cases

## Testing

### Running Tests

```bash
# Run all tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

### Test Structure

- Unit tests should be in `src/*.test.ts` files
- Integration tests should be in `tests/` directory
- Use descriptive test names and organize with `describe` blocks
- Mock external dependencies to avoid API calls during testing

### Test Coverage

We aim for at least 80% test coverage. Coverage reports are generated automatically and can be viewed in the `coverage/` directory.

## Pull Request Process

1. **Fork and Clone**: Fork the repository and clone your fork
2. **Create Branch**: Create a feature branch from `main`
3. **Make Changes**: Implement your feature or fix
4. **Add Tests**: Include tests for new functionality
5. **Update Documentation**: Update README, CHANGELOG, and other docs as needed
6. **Run Checks**: Ensure all checks pass: `pnpm run check-all`
7. **Commit**: Use conventional commit format
8. **Push**: Push your changes to your fork
9. **Create PR**: Create a pull request with a clear description

### Pull Request Guidelines

- Use a clear and descriptive title
- Provide a detailed description of changes
- Include any breaking changes or new features
- Reference any related issues
- Ensure all CI checks pass
- Request reviews from maintainers

### Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build or tool changes

Examples:

```
feat(client): add support for location photos endpoint
fix(types): correct review rating type definition
docs(readme): update installation instructions
```

## Release Process

### Versioning

We use semantic versioning (SemVer):

- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backward compatible
- **Patch** (0.0.x): Bug fixes, backward compatible

### Release Steps

1. **Update Version**: Update version in `package.json`
2. **Update CHANGELOG**: Add release notes to `CHANGELOG.md`
3. **Create Tag**: Create a git tag for the release
4. **Publish**: Publish to npm (handled by CI/CD)

### Pre-release

For pre-releases, use version tags:

```bash
# Alpha release
npm version prerelease --preid=alpha

# Beta release
npm version prerelease --preid=beta

# Release candidate
npm version prerelease --preid=rc
```

## Questions or Need Help?

- Open an issue for bugs or feature requests
- Join our discussions for general questions
- Check existing issues and pull requests
- Review the documentation

Thank you for contributing! 🎉
