import { NavigatorScreenParams } from '@react-navigation/native';
import { NavigatorNames, ScreenNames } from '../utils/ScreenNames';

export type AuthStackParamList = {
  [ScreenNames.SPLASH]: undefined;
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.OTP]: { subscriberId: string };
};

export type RootStackParamList = {
  [NavigatorNames.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [NavigatorNames.APP]: NavigatorScreenParams<AppStackParamList>;
};

export type AppStackParamList = {
  [NavigatorNames.TABS]: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.SEARCH]: undefined;
};