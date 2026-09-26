import Providers from './src/providers/Providers';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/utils/navigationRef';
import RootNavigator from './src/navigation/navigators/RootNavigator';
import { useDrawer } from './src/providers/DrawerProvider';
import { useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { translationStore } from './src/services/bhashini/DynamicTranslationStore';
function AppNavigation() {
  const { close } = useDrawer();

/**------------------------------------------------------------ */
  /**
   * Enable crashlytics collection when the app is loaded.
   */
  useEffect(() => {
    crashlytics().setCrashlyticsCollectionEnabled(true);
  }, []);

  /**------------------------------------------------------------ */
  
  /**
   * Clear the translation cache when the app is loaded.
   */
  useEffect(() => {
    const clearTranslationCache = async () => {
      await translationStore.clear();
    };
  
    clearTranslationCache();
  }, []);

  /**------------------------------------------------------------ */
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
