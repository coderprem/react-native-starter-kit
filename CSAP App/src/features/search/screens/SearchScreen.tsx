import React, { useEffect } from 'react';
import AppSafeAreaView from '../../../components/AppSafeAreaView';
import { AppText } from '../../../components/AppText';
import { logFirebaseEvent } from '../../../services/analytics/FireBaseAnalytics';
import { accessibleText } from '../../../utils/AccessibilityUtil';
import { SearchScreenAccessibleStrings } from '../../../utils/AccessibilityStrings';

const SearchScreen = () => {
  useEffect(() => {
    logFirebaseEvent('search_screen_viewed', {
      screen_name: 'Search Screen',
    });
  }, []);
  return (
    <AppSafeAreaView>
      <AppText
        {...accessibleText(SearchScreenAccessibleStrings.searchScreen)}
      />
    </AppSafeAreaView>
  );
};

export default SearchScreen;
