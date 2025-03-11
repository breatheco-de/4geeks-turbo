# 4Geeks Turbo Monorepo

This is a monorepo containing multiple packages and applications for both 4Geeks and RigoBot platforms.

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js web application
│   ├── api/          # Hono API server
│   └── docs/         # Documentation site
├── packages/
│   ├── @4geeks/
│   │   ├── actions/  # Shared business logic and utilities
│   │   ├── api/      # API client and types
│   │   └── ui/       # React component library
│   ├── @rigobot/
│   │   ├── actions/  # RigoBot specific business logic
│   │   ├── api/      # RigoBot API client
│   │   └── ui/       # RigoBot UI components
│   └── @commons/
│       ├── eslint-config/     # Shared ESLint configuration
│       ├── typescript-config/ # Shared TypeScript configuration
│       └── ui/               # Common UI components
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Bun package manager

### Installation

```bash
# Install dependencies
bun install

# Build all packages
bun run build
```

### Development

```bash
# Start development servers
bun run dev

# Kill all running processes
bun run kill
```

### Available Scripts

- `build`: Build all packages and applications
- `dev`: Start development servers
- `lint`: Run linting across all packages
- `check-types`: Run type checking
- `kill`: Kill all running development servers

## Package Namespaces

### @4geeks

- `@4geeks/actions`: Shared actions and utilities
- `@4geeks/api`: API client and types
- `@4geeks/ui`: UI components and styles

### @rigobot

- `@rigobot/actions`: RigoBot specific actions
- `@rigobot/api`: RigoBot API client
- `@rigobot/ui`: RigoBot UI components

### @commons

- `@commons/ui`: Shared UI components and utilities
- `@commons/eslint-config`: Shared ESLint configurations
- `@commons/typescript-config`: Shared TypeScript configurations

## Development Notes

- All packages are private and for internal use only
- The monorepo uses Turborepo for build orchestration
- Use `--concurrency=13` flag with turbo commands if needed

## License

Private - No License
