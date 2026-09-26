import React, { useEffect } from 'react';
import AppSafeAreaView from '../../../components/AppSafeAreaView';
import { AppText } from '../../../components/AppText';
import { logFirebaseEvent } from '../../../services/analytics/FireBaseAnalytics';
 
 const SearchScreen = () => {
  useEffect(() => {
    logFirebaseEvent('search_screen_viewed', {
      screen_name: 'Search Screen',
    });
  }, []);
  return (
    <AppSafeAreaView>
      <AppText>Search Screen</AppText>
    </AppSafeAreaView>
  );
};

export default SearchScreen;
