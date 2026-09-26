import React, { useEffect } from 'react';
import AppSafeAreaView from '../../../components/AppSafeAreaView';
import { AppText } from '../../../components/AppText';
import { logFirebaseEvent } from '../../../services/analytics/FireBaseAnalytics';
import AppButton from '../../../components/AppButton';
import { bhashiniTranslationService, translationService, translationviaBhashini } from '../../../services/bhashini';
import { useState } from 'react';

const SearchScreen = () => {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    logFirebaseEvent('search_screen_viewed', {
      screen_name: 'Search Screen',
    });
  }, []);

  const handleTranslate = async () => {
    console.log('handleTranslate');
    const translatedBhashiniText = await bhashiniTranslationService.translate(
      'Welcome to CSAP',
      'en',
      'hi',
    );
    console.log('result', translatedBhashiniText);
    setTranslatedText(translatedBhashiniText);
  };
  return (
    <AppSafeAreaView>
     <AppButton title="Translate" onPress={handleTranslate}>
      <AppText>Translate</AppText>
     </AppButton>
     <AppText>{translatedText}</AppText>
    </AppSafeAreaView>
  );
};

export default SearchScreen;
