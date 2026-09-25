import analytics from '@react-native-firebase/analytics';
import Logger from '../../utils/logger';

export const logFirebaseEvent = async (
    eventName: string,
    params?: Record<string, any>,
  ) => {
    await analytics().logEvent(eventName, params);
    Logger.log('Event logged in Firebase Analytics:', eventName, params);
  };
  
  export const setUserId = async (userId: string) => {
    await analytics().setUserId(userId);
  };
  
  export const setUserProperty = async (
    name: string,
    value: string,
  ) => {
    await analytics().setUserProperty(name, value);
  };