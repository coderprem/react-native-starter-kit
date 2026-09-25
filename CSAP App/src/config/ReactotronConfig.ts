import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'CSAP App',
})
  .useReactNative({
    overlay: false,
    storybook: false,
    devTools: false,
  })
  .use(reactotronRedux());

if (__DEV__) {
  // Defer until after the RN runtime has finished bootstrapping.
  queueMicrotask(() => {
    reactotron.connect();
    reactotron.clear?.();
  });
}

export default reactotron;
