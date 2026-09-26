/**
 * @format
 */
import './src/i18n';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

if (__DEV__) {
  require('./src/config/ReactotronConfig');
}

// Register Fabric event handling before native dispatches UI events.
import 'react-native/Libraries/ReactNative/RendererImplementation';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
