import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppSafeAreaView from '../../components/AppSafeAreaView';
import AppSpacer from '../../components/AppSpacer';
import { AppText } from '../../components/AppText';
import type { AuthStackParamList } from '../../navigation/paramsList/RootStackParamList';
import { ScreenNames } from '../../navigation/utils/ScreenNames';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { cw } from '../../utils/dimensions';

type LoginNavigation = NativeStackNavigationProp<
  AuthStackParamList,
  typeof ScreenNames.LOGIN
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavigation>();
  const [subscriberId, setSubscriberId] = useState('');
  const [error, setError] = useState('');

  const onContinue = () => {
    const trimmed = subscriberId.trim();
    if (!trimmed) {
      setError('Please enter your Subscriber ID');
      return;
    }

    setError('');
    navigation.navigate(ScreenNames.OTP, { subscriberId: trimmed });
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <AppText style={styles.title} accessibilityRole="header">
        Welcome
      </AppText>
      <AppSpacer height={24} />
      <AppText style={styles.label}>Subscriber ID</AppText>
      <AppSpacer height={8} />
      <AppInput
        value={subscriberId}
        onChangeText={setSubscriberId}
        placeholder="Enter Subscriber ID"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Subscriber ID"
        testID="subscriber-id-input"
      />
      {error ? (
        <>
          <AppSpacer height={8} />
          <AppText style={styles.error} accessibilityRole="alert">
            {error}
          </AppText>
        </>
      ) : null}
      <AppSpacer height={24} />
      <AppButton
        title="Continue"
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel="Continue to OTP verification"
        testID="login-continue-button"
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
  label: {
    ...Typography.medium_14,
    color: Colors.grey300,
  },
  error: {
    ...Typography.regular_14,
    color: Colors.error,
  },
});
