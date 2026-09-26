import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppSafeAreaView from '../../components/AppSafeAreaView';
import AppSpacer from '../../components/AppSpacer';
import { AppText } from '../../components/AppText';
import { isDemoOtpValid } from '../../demo/authDemoConstants';
import type { AuthStackParamList } from '../../navigation/paramsList/RootStackParamList';
import { ScreenNames } from '../../navigation/utils/ScreenNames';
import { useAppDispatch } from '../../store/hooks';
import { setAuthenticated } from '../../store/slice/auth/authReducer';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { cw } from '../../utils/dimensions';
import { useEffect } from 'react';
type OtpRoute = RouteProp<AuthStackParamList, typeof ScreenNames.OTP>;

export default function OTPScreen() {
  const route = useRoute<OtpRoute>();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
useEffect(() => {
  setOtp('123456');
}, []);
  const onVerify = () => {
    if (isDemoOtpValid(otp)) {
      setError('');
      dispatch(setAuthenticated(route.params.subscriberId));
      return;
    }
   
    setError('Invalid OTP. Please try again.');
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <AppText style={styles.title} accessibilityRole="header">
        Verify OTP
      </AppText>
      <AppSpacer height={24} />
      <AppInput
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        accessibilityLabel="One time password"
        testID="otp-input"
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
        title="Verify"
        onPress={onVerify}
        accessibilityRole="button"
        accessibilityLabel="Verify OTP"
        testID="otp-verify-button"
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

  error: {
    ...Typography.regular_14,
    color: Colors.error,
  },
});
