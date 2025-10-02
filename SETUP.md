# Setup Instructions

This guide will help you set up the Todo App development environment on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (>= 18.x)
   ```bash
   node --version  # Should be 18 or higher
   ```

2. **npm** (>= 9.x)
   ```bash
   npm --version  # Should be 9 or higher
   ```

3. **Java Development Kit (JDK)** (11 or newer)
   ```bash
   java -version  # Should be 11 or higher
   ```

4. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK
   - Install Android SDK Platform 33
   - Install Android Build Tools

### Android Environment Setup

1. **Set ANDROID_HOME environment variable**

   On macOS/Linux, add to `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

   Then reload:
   ```bash
   source ~/.zshrc  # or source ~/.bash_profile
   ```

2. **Verify Android Setup**
   ```bash
   adb --version
   ```

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TODO
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the necessary packages including:
- React Native
- TypeScript
- AsyncStorage
- Testing libraries
- Development tools

### 3. Configure Git

Set up the commit template:
```bash
git config commit.template .git-commit-template
```

Set your Git user (if not already set):
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 4. Android Setup

The Android project is already configured. You just need to:

1. Open Android Studio
2. Open the `android` folder from the project
3. Let Android Studio sync Gradle files
4. Wait for all dependencies to download

## Running the Application

### Start Metro Bundler

In one terminal:
```bash
npm start
```

### Run on Android

In another terminal:

**Option 1: Using npm script**
```bash
npm run android
```

**Option 2: Using React Native CLI**
```bash
npx react-native run-android
```

### Run on Android Device

1. Enable USB debugging on your Android device
2. Connect device via USB
3. Verify device is connected:
   ```bash
   adb devices
   ```
4. Run the app:
   ```bash
   npm run android
   ```

### Run on Android Emulator

1. Open Android Studio
2. Open AVD Manager (Android Virtual Device)
3. Create a new virtual device if needed
4. Start the emulator
5. Run the app:
   ```bash
   npm run android
   ```

## Development Workflow

### Code Quality Checks

Before committing, run:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Recommended VS Code Extensions

Install these extensions for better development experience:

1. **ESLint** - For linting
2. **Prettier** - For code formatting
3. **React Native Tools** - For debugging
4. **TypeScript** - For TypeScript support
5. **EditorConfig** - For consistent coding styles

## Troubleshooting

### Common Issues

#### 1. Metro bundler issues
```bash
npm start -- --reset-cache
```

#### 2. Android build fails
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### 3. Dependencies out of sync
```bash
rm -rf node_modules
npm install
cd android && ./gradlew clean && cd ..
```

#### 4. Port 8081 already in use
```bash
# Find and kill the process
lsof -ti:8081 | xargs kill -9
npm start
```

#### 5. Gradle daemon issues
```bash
cd android
./gradlew --stop
./gradlew clean
cd ..
```

### Android SDK Issues

If Android SDK is not found:

1. Open Android Studio
2. Go to: Preferences → Appearance & Behavior → System Settings → Android SDK
3. Note the SDK Location path
4. Set ANDROID_HOME to that path

### Java Version Issues

If you have multiple Java versions:

```bash
# On macOS (if using multiple JDKs)
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Making Commits

```bash
git add .
git commit
# This will open the commit template
# Fill in the type, subject, and body
```

Example commit message:
```
feat: add todo priority filter

Add ability to filter todos by priority level.
Users can now select high, medium, or low priority.

Closes #123
```

### Pushing Changes

```bash
git push origin feature/your-feature-name
```

### Creating Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit for review

## Building for Production

### Generate Release APK

```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Generate Release AAB (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Android Developer Guide](https://developer.android.com/)
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)

## Getting Help

If you encounter issues:

1. Check this setup guide
2. Review the main README.md
3. Check existing issues on GitHub
4. Create a new issue using the bug report template

---

Happy Coding! 🚀

