# Badge Setup Guide

This guide explains how to set up dynamic badges for your GitHub repository once it's published.

## Available Badges

### 1. NPM Version Badge

```markdown
[![npm version](https://badge.fury.io/js/tripadvisor-client.svg)](https://badge.fury.io/js/tripadvisor-client)
```

**Setup**:

- Publish your package to NPM
- Replace `tripadvisor-client` with your actual package name

### 2. GitHub Actions CI/CD Badge

```markdown
[![CI/CD](https://github.com/your-username/tripadvisor-client/workflows/CI%2FCD/badge.svg)](https://github.com/your-username/tripadvisor-client/actions)
```

**Setup**:

- Replace `your-username` with your GitHub username
- Replace `tripadvisor-client` with your repository name
- The workflow name should match your `.github/workflows/ci.yml` file

### 3. Code Coverage Badge

```markdown
[![Code Coverage](https://codecov.io/gh/your-username/tripadvisor-client/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/tripadvisor-client)
```

**Setup**:

1. Go to [Codecov.io](https://codecov.io) and sign in with GitHub
2. Add your repository to Codecov
3. Create an environment named `main` in Codecov settings
4. Get your repository token from the Codecov dashboard
5. Add `CODECOV_TOKEN` to your GitHub repository secrets
6. Replace `your-username` and `tripadvisor-client` with your actual values

### 4. Bundle Size Badge

```markdown
[![Bundle Size](https://img.shields.io/bundlephobia/min/tripadvisor-client)](https://bundlephobia.com/result?p=tripadvisor-client)
```

**Setup**:

- Replace `tripadvisor-client` with your package name
- This badge shows the minified bundle size

### 5. Downloads Badge

```markdown
[![Downloads](https://img.shields.io/npm/dm/tripadvisor-client)](https://www.npmjs.com/package/tripadvisor-client)
```

**Setup**:

- Replace `tripadvisor-client` with your package name
- Shows monthly download count

## Complete Badge Section

Once everything is set up, your README.md badge section should look like this:

```markdown
[![npm version](https://badge.fury.io/js/tripadvisor-client.svg)](https://badge.fury.io/js/tripadvisor-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![CI/CD](https://github.com/your-username/tripadvisor-client/workflows/CI%2FCD/badge.svg)](https://github.com/your-username/tripadvisor-client/actions)
[![Code Coverage](https://codecov.io/gh/your-username/tripadvisor-client/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/tripadvisor-client)
[![Bundle Size](https://img.shields.io/bundlephobia/min/tripadvisor-client)](https://bundlephobia.com/result?p=tripadvisor-client)
[![Downloads](https://img.shields.io/npm/dm/tripadvisor-client)](https://www.npmjs.com/package/tripadvisor-client)
```

## GitHub Secrets Setup

To enable automatic publishing and coverage reporting, add these secrets to your GitHub repository:

1. **NPM_TOKEN**: Your NPM authentication token
   - Go to npmjs.com → Account → Access Tokens
   - Create a new token with publish permissions

2. **CODECOV_TOKEN**: Your Codecov repository token
   - Get this from your Codecov dashboard after adding your repository

## Steps to Enable Badges

1. **Publish to GitHub**: Push your code to a GitHub repository
2. **Set up GitHub Actions**: The CI/CD workflow will run automatically
3. **Publish to NPM**: Set up NPM_TOKEN and push to main branch
4. **Set up Codecov**: Add your repository to Codecov and get the token
5. **Update README**: Replace placeholder badges with real ones

## Troubleshooting

### Badge Not Showing

- Check if the repository/package name is correct
- Ensure the workflow file name matches the badge URL
- Verify that the service (NPM, Codecov) is properly configured

### Coverage Not Updating

- Make sure `CODECOV_TOKEN` is set in GitHub secrets
- Check that tests are generating coverage reports
- Verify the coverage file path in the workflow
- Ensure the environment name `main` is correctly set in Codecov
- Check that the Codecov integration is properly configured for your repository

### NPM Publishing Fails

- Ensure `NPM_TOKEN` has publish permissions
- Check if package name is available on NPM
- Verify package.json has correct name and version
