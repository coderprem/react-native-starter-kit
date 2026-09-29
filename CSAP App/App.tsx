import Providers from './src/providers/Providers';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/utils/navigationRef';
import RootNavigator from './src/navigation/navigators/RootNavigator';
import { useDrawer } from './src/providers/DrawerProvider';
import { useEffect } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import codePush from 'react-native-code-push';
import { translationStore } from './src/services/bhashini/DynamicTranslationStore';
import { GlobalErrorProvider } from './src/providers/GlobalErrorProvider';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};
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
  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  return (
    <Providers>
      <GlobalErrorProvider>
        <AppNavigation />
      </GlobalErrorProvider>
    </Providers>
  );
}

export default codePush(codePushOptions)(App);
