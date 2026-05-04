# React Native Starter Kit

This project is generated from [**React Native Starter Kit**](https://github.com/coderprem/react-native-starter-kit), a custom [`@react-native-community/cli`](https://github.com/react-native-community/cli) template for [**React Native**](https://reactnative.dev).

## What this template does

The starter kit scaffolds a **TypeScript** app with common production-oriented pieces wired together so you can focus on features instead of glue code:

- **Navigation** — [`@react-navigation/native`](https://reactnavigation.org/) with stack and bottom tabs, plus drawer-oriented UI building blocks
- **State** — [Redux Toolkit](https://redux-toolkit.js.org/) with [redux-persist](https://github.com/rt2zz/redux-persist), typed hooks, and an auth slice to extend
- **Server state & HTTP** — [TanStack Query](https://tanstack.com/query) and [Axios](https://axios-http.com/) with a shared API client and error helpers
- **Local storage** — [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
- **UI & UX** — Reusable app components (buttons, inputs, headers, toasts, bottom sheet, safe areas), [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash), [Lottie](https://github.com/lottie-react-native/lottie-react-native), SVG support, and a themed setup (colors, typography, Google Sans–based fonts)
- **DX** — [Reactotron](https://github.com/infinitered/reactotron) hooks for React Native and Redux (dev-friendly debugging)

After `init`, you get a runnable app with `App.tsx` mounting providers and `RootNavigator` under `src/`.

---

## Create a new app from this template

From a terminal (macOS or Linux), run:

```sh
npm_config_legacy_peer_deps=true npx @react-native-community/cli init MyApp --template https://github.com/coderprem/react-native-starter-kit
```

Replace `MyApp` with your project name.

`npm_config_legacy_peer_deps=true` tells npm to use **legacy peer dependency resolution** for the install step, which avoids many peer-conflict failures when the CLI and template dependencies pull overlapping packages.

**Windows (Command Prompt):**

```bat
set npm_config_legacy_peer_deps=true && npx @react-native-community/cli init MyApp --template https://github.com/coderprem/react-native-starter-kit
```

**Windows (PowerShell):**

```powershell
$env:npm_config_legacy_peer_deps="true"; npx @react-native-community/cli init MyApp --template https://github.com/coderprem/react-native-starter-kit
```

---

# Getting Started

> **Note**: Complete the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

Metro is the JavaScript bundler for React Native. From the **project root** of the app you created:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open another terminal in the project root and run Android or iOS.

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

Install CocoaPods dependencies first (first clone, or after native dependency changes). If the project includes a `Gemfile`, install Bundler-managed tools:

```sh
bundle install
```

Then install pods:

```sh
bundle exec pod install
```

See the [CocoaPods Getting Started](https://guides.cocoapods.org/using/getting-started.html) guide for details.

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If setup is correct, the app runs in the Android Emulator, iOS Simulator, or a connected device. You can also open the project in Android Studio or Xcode.

## Step 3: Modify your app

Open `App.tsx` and files under `src/` (for example `src/features/`, `src/navigation/`, `src/components/`). Saving triggers [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

**Full reload**

- **Android**: Press <kbd>R</kbd> twice, or open the Dev Menu (<kbd>Ctrl</kbd>+<kbd>M</kbd> / <kbd>Cmd</kbd>+<kbd>M</kbd>) and choose **Reload**.
- **iOS**: Press <kbd>R</kbd> in the iOS Simulator.

---

## Troubleshooting

See the React Native [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

---

## Learn More

- [React Native](https://reactnative.dev)
- [Environment setup](https://reactnative.dev/docs/environment-setup)
- [Learn the Basics](https://reactnative.dev/docs/getting-started)
- [Blog](https://reactnative.dev/blog)
- [`react-native` on GitHub](https://github.com/facebook/react-native)
