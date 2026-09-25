import React from 'react';
import { StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import AppSafeAreaView from '../components/AppSafeAreaView';
import AppSpacer from '../components/AppSpacer';
import { AppText } from '../components/AppText';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetAuth } from '../store/slice/auth/authReducer';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { cw } from '../utils/dimensions';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const subscriberId = useAppSelector(state => state.auth.subscriberId);

  const onLogout = () => {
    dispatch(resetAuth());
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <AppText style={styles.title} accessibilityRole="header">
        Welcome to CSAP
      </AppText>
      <AppSpacer height={12} />
      <AppText style={styles.subtitle} accessibilityLabel={`Subscriber ID ${subscriberId ?? ''}`}>
        Subscriber ID: {subscriberId ?? '—'}
      </AppText>
      <AppSpacer height={32} />
      <AppButton
        title="Logout"
        onPress={onLogout}
        accessibilityRole="button"
        accessibilityLabel="Logout"
        testID="logout-button"
      />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: cw(20),
    paddingTop: 32,
    backgroundColor: Colors.bgDark,
  },
  title: {
    ...Typography.bold_24,
    color: Colors.white,
  },
  subtitle: {
    ...Typography.regular_16,
    color: Colors.grey300,
  },
});
