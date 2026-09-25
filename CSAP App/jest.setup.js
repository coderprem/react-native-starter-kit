jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-device-info', () => ({
  DeviceInfo: {
    isTablet: () => false,
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
