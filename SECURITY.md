# Security Policy

## Supported Versions

This project is currently in pre-release (version 0.1.x). Security updates will be provided for:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of the TripAdvisor client library seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **Do not create a public GitHub issue** for the vulnerability
2. **Email us** at [felixliu553@gmail.com](mailto:felixliu553@gmail.com) with the following information:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if any)
   - Affected version(s)

### What to Expect

- We will acknowledge receipt of your report within 48 hours
- We will investigate and provide updates on our progress
- We will work with you to understand and address the issue
- We will coordinate the disclosure and release of any fixes

### Responsible Disclosure

We follow responsible disclosure practices:

- We will not publicly disclose the vulnerability until a fix is available
- We will credit you in our security advisories (unless you prefer to remain anonymous)
- We will work with you to ensure the fix addresses the root cause

## Security Features

This TripAdvisor client library includes several security features:

### 1. Input Validation

- **Zod Schema Validation**: All API inputs are validated using Zod schemas before being sent to TripAdvisor API
- **Type Safety**: TypeScript provides compile-time security checks
- **Parameter Sanitization**: All parameters are properly encoded and sanitized

### 2. Error Handling

- **Custom Error Classes**: Prevents information leakage in error messages
- **No Sensitive Data Logging**: API keys and sensitive data are never logged
- **Graceful Degradation**: Handles API failures without exposing internal details

### 3. API Key Security

- **Environment Variable Support**: API keys can be stored securely in environment variables
- **No Hardcoding**: Library prevents accidental API key exposure in code
- **Configuration Validation**: API key presence is validated at runtime

### 4. Network Security

- **HTTPS Only**: All API calls use HTTPS by default
- **Timeout Protection**: Configurable timeouts prevent hanging requests
- **Retry Logic**: Intelligent retry mechanism with exponential backoff

## Security Best Practices for Users

When using this library, please follow these security best practices:

### 1. API Key Management

```typescript
// ✅ Good: Use environment variables
const client = new TripAdvisorClient({
  apiKey: process.env.TRIPADVISOR_API_KEY,
});

// ❌ Bad: Hardcode API keys
const client = new TripAdvisorClient({
  apiKey: 'your-api-key-here',
});
```

### 2. Input Validation

```typescript
// ✅ Good: Validate user input before API calls
const searchQuery = sanitizeUserInput(userInput);
const results = await client.locationSearch({
  searchQuery: searchQuery,
  category: 'hotels',
});

// ❌ Bad: Pass raw user input directly
const results = await client.locationSearch({
  searchQuery: userInput, // Could contain malicious content
  category: 'hotels',
});
```

### 3. Error Handling

```typescript
// ✅ Good: Handle errors without exposing sensitive information
try {
  const results = await client.locationSearch({ searchQuery: 'Paris' });
} catch (error) {
  if (error instanceof TripAdvisorError) {
    console.error('API Error:', error.message);
    // Don't log error.code or error.type in production
  }
}

// ❌ Bad: Log everything including sensitive data
try {
  const results = await client.locationSearch({ searchQuery: 'Paris' });
} catch (error) {
  console.error('Full error:', error); // Could expose sensitive data
}
```

### 4. Rate Limiting

```typescript
// ✅ Good: Implement rate limiting
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to your API endpoints
app.use('/api/tripadvisor', limiter);
```

## Security Considerations

### 1. TripAdvisor API Integration

- This library is a wrapper around TripAdvisor's Content API
- All data comes from TripAdvisor's servers
- We do not store or cache any user data
- API rate limits are enforced by TripAdvisor

### 2. Data Privacy

- No personal data is collected or stored by this library
- All data processing happens in memory
- No persistent storage of API responses
- User data is only passed through to TripAdvisor API

### 3. Dependencies

- **Minimal Dependencies**: Only `zod` for validation (no other runtime dependencies)
- **Regular Updates**: Dependencies are regularly updated for security patches
- **Vulnerability Scanning**: Dependencies are monitored for known vulnerabilities

### 4. Code Quality

- **High Test Coverage**: 97.26% test coverage ensures security-related code is tested
- **Static Analysis**: ESLint and TypeScript provide additional security checks
- **Code Review**: All changes undergo security review

## Security Updates

- Security updates will be released as patch versions (e.g., 0.1.2)
- Critical security fixes will be backported to supported versions
- All security updates will be documented in the CHANGELOG.md
- Security advisories will be published for significant vulnerabilities

## Contact Information

For security-related issues, please contact:

- **Email**: [felixliu553@gmail.com](mailto:felixliu553@gmail.com)
- **GitHub Issues**: For non-security issues, use [GitHub Issues](https://github.com/stellarrover/tripadvisor-client/issues)
- **Author**: Felix Lau

## Security Checklist for Contributors

Before submitting code changes, ensure:

- [ ] No hardcoded API keys or sensitive data
- [ ] Input validation is implemented for new features
- [ ] Error handling doesn't expose sensitive information
- [ ] Tests cover security-related functionality
- [ ] Dependencies are up to date
- [ ] Code follows security best practices

Thank you for helping keep our community secure! 🔒
