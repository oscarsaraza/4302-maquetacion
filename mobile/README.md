# Alarm App - Mobile

Mobile alarm application built with React Native and Expo.

## Requirements

- Node.js >= 18
- Expo Go installed on your mobile device

## Installation

```bash
cd mobile
npm install
```

## Running

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### Other commands

```bash
npx expo start --clear    # Start with cache cleared
npx expo start --android  # Open directly on Android
npx expo start --ios      # Open directly on iOS
npx expo start --web      # Open in browser
```

## Structure

```
mobile/
├── App.js                        # Entry point with navigation and providers
├── app.json                      # Expo configuration
├── assets/                       # Icons and splash screen
└── src/
    ├── context/AlarmContext.js    # Global alarm state (Context API)
    ├── components/AlarmCard.js   # Individual alarm card
    ├── screens/
    │   ├── HomeScreen.js         # Main screen with alarm list
    │   └── AlarmFormScreen.js    # Create/edit alarm
    │   └── DevicesScreen.js      # Devices screen
    ├── data.js                   # Initial mock data
    └── theme.js                  # Color palette
```

## Technologies

- Expo SDK 54
- React Native 0.81
- React Navigation (native-stack)
