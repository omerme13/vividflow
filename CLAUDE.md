# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # TypeScript type-check + Vite production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture Overview

VividFlow is a React 19 + TypeScript task management SPA using Vite as the build tool.

### State Management

Uses React Context API with domain-specific contexts:
- **TaskContext** - Task CRUD operations and filtering
- **ActivityContext** - Activity/audit log tracking
- **PreferenceContext** - User preferences (dark mode, date/time format)
- **LayoutContext** - UI state (sidebar, view mode)
- **CalendarContext** / **DashboardContext** - Page-specific state

Each context follows the pattern: Provider component + custom hook for consumption.

### Data Persistence

All data persists to localStorage with keys prefixed `vividflow_`:
- `vividflow_tasks` - Task data
- `vividflow_user_preferences` - User settings
- `vividflow_layout` - UI layout state
- `vividflow_activities` - Activity log
- `vividflow_calendar_preference` - Calendar settings
- `vividflow_dashbaord_time_filter` - Dashboard filters

### Routing

React Router v7 with nested layout hierarchy:
- RootLayout → TaskEnabledLayout → Page routes
- Pages: Tasks (`/`), Dashboard, Calendar, Settings

### Styling

SCSS with CSS custom properties. Global files auto-imported via Vite:
- `_variables.scss` - Design tokens (colors, spacing, shadows)
- `_breakpoints.scss` - Media queries (S: 600px, M: 900px, L: 1200px, XL: 1400px)
- `_utilities.scss` - Utility classes
- `_reset.scss` - CSS reset

Dark mode: Toggle `dark` class on `<html>`, CSS variables override in `html.dark` selector.

### Path Aliases

`@/*` maps to `src/*` (configured in tsconfig.json and vite.config.ts)

### Component Conventions

- Co-located files: `Component.tsx`, `Component.scss`, `Component.types.ts`
- Barrel exports via `index.ts`
- SVGs imported as React components via vite-plugin-svgr
