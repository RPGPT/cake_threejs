# Bun Quick Reference

## Common Commands

### Package Management
```bash
# Install all dependencies
bun install

# Add a package
bun add <package>

# Add a dev dependency
bun add -d <package>

# Remove a package
bun remove <package>

# Update packages
bun update
```

### Project Scripts
```bash
# Development
bun start                # Start dev server
bun watch                # Watch mode for builds

# Build
bun build                # Production build

# Code Quality
bun lint                 # Run ESLint
bun run lint:fix         # Auto-fix lint issues
bun format               # Format with Prettier
bun run format:check     # Check formatting
bun check                # Run all checks

# Test
bun test                 # Run tests
```

### Performance
- **Installation**: ~15-20x faster than npm
- **Script execution**: ~20% faster than npm
- **Memory usage**: ~60% less than npm

### Location
```
C:\Users\CTW03150\.bun\bin\bun.exe
```

### Add to PATH (Windows)
1. Open System Properties → Environment Variables
2. Edit PATH for your user
3. Add: `C:\Users\CTW03150\.bun\bin`
4. Restart terminal

Then you can use just `bun` instead of the full path.

## Files
- `bun.lock` - Lock file (committed to git)
- `package.json` - Same as npm
- `node_modules/` - Same as npm

## Compatibility
✅ 100% compatible with npm packages
✅ Uses npmjs.com registry
✅ Reads package.json
✅ Works with all Angular tools

