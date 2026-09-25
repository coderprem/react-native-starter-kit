import React, { useEffect } from "react";
import AppSafeAreaView from "../../../components/AppSafeAreaView";
import { AppText } from "../../../components/AppText";
import AppButton from "../../../components/AppButton";
import { logFirebaseEvent } from "../../../services/analytics/FireBaseAnalytics";
import Logger from "../../../utils/logger";
const SearchScreen = () => {
  useEffect(() => {
    logFirebaseEvent('search_screen_viewed', {
      screen_name: 'SearchScreen',
    });
    Logger.log('Search screen viewed');
  }, []);
  return (
    <AppSafeAreaView>
      <AppText>Search Screen1</AppText>
      <AppButton title="Log Event" onPress={() => {
        logFirebaseEvent('search_screen_viewed', {
          screen_name: 'SearchScreen',
        });
      }} />
    </AppSafeAreaView>
  );
};

export default SearchScreen;