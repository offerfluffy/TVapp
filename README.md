# TV Example

Creates a project that can build for Apple TV and Android TV targets.

This project utilizes:

- **React Native TV fork** ([react-native-tvos](https://github.com/react-native-tvos/react-native-tvos)), which enables support for both mobile platforms (Android and iOS) and TV platforms (Android TV and Apple TV).
- **React Native TV config plugin** ([config-tv](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv)) to customize native project files during Expo prebuilds, specifically tailored for TV builds.
- **React TV Space Navigation** ([react-tv-space-navigation](https://github.com/bamlab/react-tv-space-navigation/tree/main)) to provide smooth and intuitive navigation using remote controls on TV devices.
- **Expo** ([expo.dev](https://expo.dev/)) as the development framework, enabling easier builds and deployment across platforms.

## 🚀 How to use

#### Creating a new project

- Create a project: `npx create-expo-app -e with-tv`
- `cd` into the project

```sh
export EXPO_TV=1
npx expo prebuild
yarn ios # Build for Apple TV
yarn android # Build for Android TV
```

> **_NOTE:_**
> Setting the environment variable `EXPO_TV=1` enables the `@react-native-tvos/config-tv` plugin to modify the project for TV.
> This can also be done by setting the parameter `isTV` to true in the `app.json`.

#### TV specific file extensions

This project contains an [example Metro configuration](./metro.config.js) that allows Metro to resolve application source files with TV-specific code, indicated by specific file extensions (`*.ios.tv.tsx`, `*.android.tv.tsx`, `*.tv.tsx`). This config is not enabled by default, since it will impact bundling performance, but is available for developers who need this capability.

#### TV specific app icons and banners

This project contains placeholder images for the Android TV banner and for Apple TV brand assets (app icon and top shelf images). The `config-tv` plugin will use these images to construct the required native image files and make the right modifications in project files. You can simply replace these images with your own app images. Note that for Apple TV, the images must be the exact sizes indicated.
