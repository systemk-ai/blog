# Single source of truth for project commands. Run `just` to list recipes.
# Mirrors package.json scripts; AGENTS.md points here for all commands.

# List available recipes.
default:
  @just --list

# Start the dev server (Astro, http://localhost:4321/blog/).
dev:
  pnpm dev

# Build the static site to dist/.
build:
  pnpm build

# Preview the built site locally.
preview:
  pnpm preview

# Lint + format check (no writes). Fails on any issue — used by CI via `biome ci`.
check:
  pnpm check

# Auto-fix lint + format issues.
fix:
  pnpm check:fix

# Run unit tests (vitest).
test:
  pnpm test

# Run unit tests in watch mode.
test-watch:
  pnpm test:watch

# Run end-to-end tests (Playwright; builds + previews under /blog/).
test-e2e:
  pnpm test:e2e

# Full local gate: quality + unit tests + build. Run before pushing.
verify:
  pnpm check
  pnpm test
  pnpm build

# Build and generate the Pagefind search index into dist/.
# (Wire the search UI per .agents/knowledge/SPEC.md before relying on this.)
search-index:
  pnpm build
  pnpm exec pagefind --site dist

# Remove build output and caches.
clean:
  rm -rf dist .astro
