import Providers from './template/src/providers/Providers';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './template/src/navigation/utils/navigationRef';
import RootNavigator from './template/src/navigation/navigators/RootNavigator';

function App() {
  return (
    <Providers>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </Providers>
  );
}


export default App;
