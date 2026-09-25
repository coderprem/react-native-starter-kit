import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/auth/LoginScreen';
import OTPScreen from '../../screens/auth/OTPScreen';
import SplashScreen from '../../screens/SplashScreen';
import { useAppSelector } from '../../store/hooks';
import type { AuthStackParamList } from '../paramsList/RootStackParamList';
import { ScreenNames } from '../utils/ScreenNames';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const skipSplash = useAppSelector(state => state.auth.skipSplash);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={skipSplash ? ScreenNames.LOGIN : ScreenNames.SPLASH}
    >
      <Stack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ScreenNames.OTP} component={OTPScreen} />
    </Stack.Navigator>
  );
}
