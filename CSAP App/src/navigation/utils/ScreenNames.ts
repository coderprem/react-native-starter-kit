export const ScreenNames = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  OTP: 'Otp',
  HOME: 'Home',
  SEARCH: 'Search',
} as const;

export type ScreenName = (typeof ScreenNames)[keyof typeof ScreenNames];


export const NavigatorNames = {
  ROOT: 'Root',
  AUTH: 'Auth',
  APP: 'App',
  TABS: 'Tabs',
} as const;