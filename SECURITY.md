# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our library seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Reporting Process

1. **Do not create a public GitHub issue** for the vulnerability
2. **Email us** at [security@yourdomain.com](mailto:security@yourdomain.com) with the following information:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if any)

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

### Security Best Practices

When using this library, please follow these security best practices:

1. **API Key Security**
   - Never commit API keys to version control
   - Use environment variables for API keys
   - Rotate API keys regularly
   - Use the minimum required permissions

2. **Input Validation**
   - Always validate user input before passing to the API
   - Use the provided Zod schemas for validation
   - Sanitize any user-provided data

3. **Error Handling**
   - Don't expose sensitive information in error messages
   - Log errors appropriately without exposing internal details
   - Handle API errors gracefully

4. **Rate Limiting**
   - Implement appropriate rate limiting for API calls
   - Respect TripAdvisor's API rate limits
   - Use exponential backoff for retries

### Security Features

This library includes several security features:

- **Input Validation**: All inputs are validated using Zod schemas
- **Error Handling**: Custom error classes prevent information leakage
- **Type Safety**: TypeScript provides compile-time security checks
- **No Dependencies**: Minimal external dependencies reduce attack surface

### Updates and Patches

- Security updates will be released as patch versions (e.g., 1.0.1)
- Critical security fixes may be backported to previous major versions
- All security updates will be documented in the CHANGELOG.md

### Contact Information

For security-related issues, please contact:

- **Email**: [security@yourdomain.com](mailto:security@yourdomain.com)
- **PGP Key**: [Available upon request]

Thank you for helping keep our community secure! 🔒
