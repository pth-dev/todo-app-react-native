# Todo App - React Native

A professional TODO list application built with React Native and TypeScript, following clean code principles and production-ready practices.

## Features

- ✅ Create, update, and delete TODO items
- 🎯 Priority levels (Low, Medium, High)
- 🔄 Status tracking (Active, Completed)
- 🔍 Filter by status and priority
- 💾 Local storage persistence
- 📱 Optimized for Android
- 🎨 Modern and clean UI design

## Tech Stack

- **React Native 0.72.6** - Mobile framework
- **TypeScript** - Type safety
- **AsyncStorage** - Local data persistence
- **Jest** - Testing framework
- **ESLint & Prettier** - Code quality

## Architecture

The project follows clean architecture principles with clear separation of concerns:

```
src/
├── models/          # Data models and interfaces
├── services/        # Business logic and data access
├── hooks/           # Custom React hooks
├── components/      # UI components
├── utils/           # Utility functions
└── constants/       # App constants
```

### Key Patterns

- **Service Layer**: Encapsulates business logic
- **Custom Hooks**: Manages state and side effects
- **Component Composition**: Reusable UI components
- **TypeScript Strict Mode**: Full type safety

## Prerequisites

- Node.js >= 18
- npm >= 9
- Android Studio (for Android development)
- JDK 11 or newer

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TODO
```

2. Install dependencies:
```bash
npm install
```

3. Install Android dependencies:
```bash
cd android
./gradlew clean
cd ..
```

## Running the App

### Android

1. Start Metro bundler:
```bash
npm start
```

2. In a new terminal, run on Android:
```bash
npm run android
```

Or use Android Studio to open the `android` folder and run from there.

## Development

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check
```

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Project Structure

### Models (`src/models/`)

Define the data structures and types used throughout the app:
- `Todo`: Main TODO item interface
- `TodoPriority`: Priority levels enum
- `TodoStatus`: Status types enum

### Services (`src/services/`)

Handle business logic and data persistence:
- `TodoService`: Manages TODO operations
- `StorageService`: Handles AsyncStorage operations

### Hooks (`src/hooks/`)

Custom React hooks for state management:
- `useTodo`: Main hook for TODO operations

### Components (`src/components/`)

Reusable UI components:
- `TodoItem`: Single TODO item display
- `TodoForm`: Create new TODO
- `TodoFilterComponent`: Filter controls

## Git Workflow

This project follows professional Git practices:

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Production hotfixes

### Commit Convention

Follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

Example:
```bash
git commit -m "feat: add priority filter to todo list"
```

### Workflow

1. Create a feature branch:
```bash
git checkout -b feature/my-feature
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: description of changes"
```

3. Push to remote:
```bash
git push origin feature/my-feature
```

4. Create a Pull Request

## Building for Production

### Android Release Build

1. Generate a release keystore (first time only):
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/gradle.properties` with keystore details

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

4. Build release AAB (for Play Store):
```bash
cd android
./gradlew bundleRelease
```

The release files will be in:
- APK: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/`

## Code Guidelines

This project follows TypeScript best practices:

- ✅ Always declare types (no `any`)
- ✅ Use meaningful variable names
- ✅ Keep functions small and focused
- ✅ Follow SOLID principles
- ✅ Write JSDoc for public APIs
- ✅ Use const for immutable data
- ✅ Prefer composition over inheritance

## Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Clear all caches
```bash
npm start -- --reset-cache
cd android && ./gradlew clean && cd ..
rm -rf node_modules && npm install
```

## License

MIT

## Contributors

Your name and team members

---

Built with ❤️ using React Native and TypeScript

