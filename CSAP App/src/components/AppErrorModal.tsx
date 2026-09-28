import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
} from 'react-native';

import AppButton from './AppButton';
import {AppText} from './AppText';
import {Colors} from '../theme/colors';
import {Typography} from '../theme/typography';

interface AppErrorModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const AppErrorModal = ({
  visible,
  title,
  message,
  onClose,
}: AppErrorModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={styles.container}
          accessible
          accessibilityViewIsModal
        >
          <AppText
            style={styles.title}
            accessibilityRole="header"
          >
            {title}
          </AppText>

          <AppText style={styles.message}>
            {message}
          </AppText>

          <AppButton
            title="OK"
            onPress={onClose}
            accessibilityLabel="Close error message"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  container: {
    width: '85%',
    padding: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },

  title: {
    ...Typography.bold_20,
    color: Colors.black,
  },

  message: {
    ...Typography.regular_14,
    marginTop: 12,
    marginBottom: 24,
    color: Colors.grey700,
  },
});

export default AppErrorModal;