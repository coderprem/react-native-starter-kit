import Providers from './src/providers/Providers';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/utils/navigationRef';
import RootNavigator from './src/navigation/navigators/RootNavigator';
import { useDrawer } from './src/providers/DrawerProvider';

function AppNavigation() {
  const { close } = useDrawer();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        close();
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function App() {
  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
}

export default App;
