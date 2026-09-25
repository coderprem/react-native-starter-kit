import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAppSelector } from '../../store/hooks';
import type { RootStackParamList } from '../paramsList/RootStackParamList';
import { NavigatorNames } from '../utils/ScreenNames';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name={NavigatorNames.APP} component={AppNavigator} />
      ) : (
        <Stack.Screen name={NavigatorNames.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
