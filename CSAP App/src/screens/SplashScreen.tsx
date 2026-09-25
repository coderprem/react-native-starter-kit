import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppText } from '../components/AppText';
import { SPLASH_DELAY_MS } from '../demo/authDemoConstants';
import type { AuthStackParamList } from '../navigation/paramsList/RootStackParamList';
import { ScreenNames } from '../navigation/utils/ScreenNames';
import { useAppDispatch } from '../store/hooks';
import { markSplashComplete } from '../store/slice/auth/authReducer';
import { Typography } from '../theme/typography';
import { Colors } from '../theme/colors';
import { ch } from '../utils/dimensions';

type SplashNavigation = NativeStackNavigationProp<
  AuthStackParamList,
  typeof ScreenNames.SPLASH
>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashNavigation>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(markSplashComplete());
      navigation.replace(ScreenNames.LOGIN);
    }, SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <View style={styles.container} accessibilityLabel="Splash screen">
      <AppText style={styles.title} accessibilityRole="header">
        CSAP
      </AppText>
      <ActivityIndicator size="large" color={Colors.lightPink} accessibilityLabel="Loading" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgDark,
    gap: ch(24),
  },
  title: {
    ...Typography.bold_32,
    color: Colors.white,
  },
});
