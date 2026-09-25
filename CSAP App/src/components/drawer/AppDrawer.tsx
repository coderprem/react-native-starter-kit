import React, { useEffect, useRef } from 'react';
import {
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { useDrawer } from '../../providers/DrawerProvider';
import { Colors } from '../../theme/colors';
import { IS_TABLET } from '../../utils/device';
import { AppText } from '../AppText';

const SCREEN_WIDTH = Dimensions.get('window').width;

const getDrawerWidth = () => {
  if (IS_TABLET) {
    return 320;
  }
  return SCREEN_WIDTH * 0.83;
};

const DRAWER_WIDTH = getDrawerWidth();

const AppDrawer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, close } = useDrawer();
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen, translateX]);

  return (
    <View style={styles.root}>
      {children}

      {isOpen && (
        <Pressable
          style={styles.overlay}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
      )}

      <Animated.View
        pointerEvents={isOpen ? 'auto' : 'none'}
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <AppText> Drawer Content </AppText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: Colors.bgDark,
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackOpacity60,
    zIndex: 9,
  },
});

export default AppDrawer;
