import React from "react";
import AppSafeAreaView from "../../../components/AppSafeAreaView";
import { AppText } from "../../../components/AppText";
import AppButton from "../../../components/AppButton";
import { logFirebaseEvent } from "../../../services/analytics/FireBaseAnalytics";
import { useEffect } from "react";
import Logger from "../../../utils/logger";
const HomeScreen = () => {
  useEffect(() => {
    logFirebaseEvent('home_screen_viewed', {
      screen_name: 'HomeScreen',
    });
    Logger.log('Home screen viewed');
  }, []);
  return (
    <AppSafeAreaView>
      <AppText>Home Screen</AppText>
      <AppButton title="Log Event" onPress={() => {
        logFirebaseEvent('home_screen_viewed', {
          screen_name: 'HomeScreen',
        });
      }} />
    </AppSafeAreaView>
  );
};

export default HomeScreen;