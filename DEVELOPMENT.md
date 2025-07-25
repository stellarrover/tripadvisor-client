# Development Guide

## Project Configuration Files

This project uses multiple configuration files to ensure code quality and consistency:

### Code Formatting

- **`.prettierrc`**: Prettier formatting configuration
- Single quotes, semicolons, 120 character width
- Automatic import organization and package.json sorting

- **`.editorconfig`**: Editor basic configuration
- Ensures consistency across editors
- Unified indentation, line endings and other basic settings

### Code Quality Checks

- **`eslint.config.js`**: ESLint rule configuration
  - TypeScript syntax checking
  - Code quality rules
  - Integration with Prettier

- **`.cspell.json`**: Spell checking configuration
  - Custom vocabulary list
  - Ignore specific file types

### Available Scripts

```bash
# Code formatting
npm run format          # Format all files
npm run format:check    # Check formatting status

# Code quality checks
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix ESLint issues
npm run spell-check     # Run spell checking

# Type checking
npm run type-check      # TypeScript type checking

# Run all checks
npm run check-all       # Type checking + code quality + formatting + spell checking
```

### VSCode Settings

The project includes the following VSCode configuration files:

#### Recommended Extensions

The `.vscode/extensions.json` file lists recommended extensions:

- **Prettier**: Code formatting
- **ESLint**: Code quality checking
- **Code Spell Checker**: Spell checking
- **TypeScript**: TypeScript support

#### Workspace Settings

The `.vscode/settings.json` file contains editor behavior configuration.

#### Manual Configuration (Optional)

If you want automatic formatting on save, you can manually add the following settings in VSCode:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "always"
  }
}
```

Alternatively, you can use the project-provided script:

```bash
npm run format  # Manually format all files
```

### Configuration Transferred from VSCode Settings

The following configurations have been transferred from VSCode personal settings to project configuration:

1. **Spell checking vocabulary** → `.cspell.json`
2. **Prettier formatting rules** → `.prettierrc`
3. **ESLint rules** → `eslint.config.js`
4. **Editor basic settings** → `.editorconfig`

This ensures that team members use the same code style and quality standards.
