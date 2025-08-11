# TV application

A project for Apple TV and Android TV targets.

This project utilizes:

- **React Native TV fork** ([react-native-tvos](https://github.com/react-native-tvos/react-native-tvos)), which enables support for both mobile platforms (Android and iOS) and TV platforms (Android TV and Apple TV).  
- **React Native TV config plugin** ([config-tv](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv)) to customize native project files during Expo prebuilds, specifically tailored for TV builds.  
- **React TV Space Navigation** ([react-tv-space-navigation](https://github.com/bamlab/react-tv-space-navigation/tree/main)) to provide smooth and intuitive navigation using remote controls on TV devices.  
- **Expo** ([expo.dev](https://expo.dev/)) as the development framework, enabling easier builds and deployment across platforms.  
- **Pixel-perfect scaling** ([react-native-pixel-perfect](https://github.com/ksrnnb/react-native-pixel-perfect)) to ensure consistent styles, spacing, and layout proportions across both tvOS and Android TV devices.  

## 🚀 How to use

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
    ````

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the app on your target device (Android/iOS/TV):

   ```bash
   npm start
   # or
   expo start
   ```

4. Follow the Expo CLI instructions to launch on the desired platform (emulator, device, or TV).
  
6. Use the TV remote to navigate through the app with React TV Space Navigation.
