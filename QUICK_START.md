# Quick Start Guide

Get the Todo App up and running in 5 minutes! ⚡

## Prerequisites Check

```bash
# Check Node.js (need >= 18)
node --version

# Check npm (need >= 9)
npm --version

# Check Java (need >= 11)
java -version
```

If any of these are missing, see [SETUP.md](SETUP.md) for detailed installation instructions.

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development

### Option A: One Command (Recommended)

```bash
# This will start Metro and build for Android
npm run android
```

### Option B: Two Separate Commands

Terminal 1 - Start Metro:
```bash
npm start
```

Terminal 2 - Build and Run:
```bash
npm run android
```

## 3. Development Device

### Using Android Emulator (Easiest)

1. Open Android Studio
2. AVD Manager → Create Virtual Device
3. Choose a device (e.g., Pixel 6)
4. Download a system image (API 33 recommended)
5. Start the emulator
6. Run `npm run android`

### Using Physical Device

1. Enable Developer Options on your Android device:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging in Developer Options
3. Connect device via USB
4. Allow USB debugging prompt on device
5. Verify connection: `adb devices`
6. Run `npm run android`

## Project Structure

```
TODO/
├── src/
│   ├── models/          # Data types and interfaces
│   ├── services/        # Business logic
│   ├── hooks/           # React hooks
│   ├── components/      # UI components
│   ├── utils/           # Helper functions
│   └── constants/       # App constants
├── android/             # Android native code
├── __tests__/           # Test files
└── docs/                # Documentation
```

## Features to Try

1. **Create Todo**: Tap the + button
2. **Set Priority**: Choose Low, Medium, or High
3. **Complete Todo**: Tap the checkbox
4. **Filter Todos**: Use status and priority filters
5. **Delete Todo**: Tap the × button

## Common Commands

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run lint          # Check code quality
npm run test          # Run tests

# Code Quality
npm run lint:fix      # Auto-fix linting issues
npm run format        # Format code
npm run type-check    # TypeScript checking
```

## Troubleshooting

### App won't start?
```bash
npm start -- --reset-cache
```

### Build fails?
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### Dependencies issues?
```bash
rm -rf node_modules
npm install
```

### Port 8081 in use?
```bash
lsof -ti:8081 | xargs kill -9
npm start
```

## Next Steps

- 📖 Read [README.md](README.md) for full documentation
- 🔧 See [SETUP.md](SETUP.md) for detailed setup
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- 📝 Review [CHANGELOG.md](CHANGELOG.md) for version history

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature
```

## Need Help?

- Check the [Troubleshooting](#troubleshooting) section
- Review [SETUP.md](SETUP.md) for detailed guides
- Open an issue on GitHub using the templates

---

🎉 **You're all set! Happy coding!**

