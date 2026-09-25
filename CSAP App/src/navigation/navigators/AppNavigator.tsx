import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppStackParamList } from '../paramsList/RootStackParamList';
import { NavigatorNames } from '../utils/ScreenNames';
import TabsNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NavigatorNames.TABS} component={TabsNavigator} />
    </Stack.Navigator>
  );
}
