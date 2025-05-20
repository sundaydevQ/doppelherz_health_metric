# Doppelherz Health Metric

A React application built with Vite, TypeScript, TailwindCSS, HeroUI, and TanStack Router for tracking health metrics and providing personalized insights.

## Project Structure

The project follows a feature-based architecture for better organization and maintainability:

```
src/
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── hooks/         # Auth-specific hooks
│   │   └── services/      # Auth-specific services
│   ├── home/              # Home feature
│   ├── survey/            # Survey feature
│   └── health-tracking/   # Health tracking feature
├── shared/                # Shared resources
│   ├── components/        # Reusable UI components
│   ├── contexts/          # Context providers
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Static assets
└── styles/                # Global styles
```

## Benefits of the New Structure

### 1. Better Separation of Concerns

- Each feature is self-contained with its own components, services, and hooks
- Clearer boundaries between different parts of the application
- Easier to understand where specific functionality lives in the codebase

### 2. Improved Scalability

- New features can be added without affecting existing code
- The application can grow organically with minimal refactoring
- Feature teams can work independently on different modules

### 3. Enhanced Code Reuse

- Shared components and utilities are well-organized and easily accessible
- Common functionality is centralized to prevent duplication
- Consistent patterns across features through shared resources

### 4. Simplified Imports

- Barrel files (index.ts) make imports cleaner and more consistent
- Reduced import path complexity with logical grouping
- Easier to move code without breaking numerous imports

### 5. Better Developer Experience

- Faster onboarding for new developers with intuitive structure
- Reduced cognitive load when navigating the codebase
- Clear patterns for where to add new functionality

### 6. Improved Maintainability

- Easier to locate and fix bugs when features are isolated
- Changes to one feature are less likely to break others
- More straightforward testing with clear component boundaries

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd doppelherz_health_metric

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```
