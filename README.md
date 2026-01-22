# 👥 User List

A React Native app displaying a paginated list of users with infinite scroll, pull-to-refresh, search, and error handling. Built with React Native and Redux Toolkit.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Yashk786/userList.git
cd userList

# Install dependencies
npm install

# iOS only - Install pods
cd ios && pod install && cd ..

# Run the app
npm run android  # For Android
npm run ios      # For iOS
```

## 📦 APK File

The tested APK file is located in the `releases/` folder at the root of the repository.

**APK Location:** `releases/UserList-v1.0.apk` (or `releases/app-release.apk`)

To build your own APK:

```bash
# Navigate to android directory
cd android

# Build release APK
./gradlew assembleRelease

# The APK will be generated at:
# android/app/build/outputs/apk/release/app-release.apk
```

## 🛠️ Tech Stack

- React Native
- Redux Toolkit
- React Navigation
