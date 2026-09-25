import React from 'react';
import TestRenderer, { act, ReactTestInstance } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import authReducer, { setAuthenticated } from '../store/slice/auth/authReducer';
import { ScreenNames } from '../navigation/utils/ScreenNames';
import { DEMO_OTP } from '../demo/authDemoConstants';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    replace: mockReplace,
  }),
  useRoute: () => ({
    params: { subscriberId: 'SUB123' },
  }),
}));

function createTestStore() {
  return configureStore({
    reducer: { auth: authReducer },
  });
}

function findByTestId(root: ReactTestInstance, testID: string): ReactTestInstance | undefined {
  return root.findAll(node => node.props?.testID === testID)[0];
}

describe('auth prototype screens', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockReplace.mockClear();
  });

  it('navigates from Login to OTP when subscriber id is provided', () => {
    let tree: TestRenderer.ReactTestRenderer;

    act(() => {
      tree = TestRenderer.create(
        <Provider store={createTestStore()}>
          <LoginScreen />
        </Provider>,
      );
    });

    const input = findByTestId(tree!.root, 'subscriber-id-input');
    act(() => {
      input!.props.onChangeText('SUB123');
    });

    const continueButton = findByTestId(tree!.root, 'login-continue-button');
    act(() => {
      continueButton!.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith(ScreenNames.OTP, {
      subscriberId: 'SUB123',
    });
  });

  it('shows error for incorrect OTP', () => {
    const store = createTestStore();
    let tree: TestRenderer.ReactTestRenderer;

    act(() => {
      tree = TestRenderer.create(
        <Provider store={store}>
          <OTPScreen />
        </Provider>,
      );
    });

    const input = findByTestId(tree!.root, 'otp-input');
    act(() => {
      input!.props.onChangeText('000000');
    });

    const verifyButton = findByTestId(tree!.root, 'otp-verify-button');
    act(() => {
      verifyButton!.props.onPress();
    });

    const errorText = tree!.root.findAll(
      node => node.props?.accessibilityRole === 'alert',
    );

    expect(errorText.length).toBeGreaterThan(0);
    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(store.getState().auth.subscriberId).toBeNull();
  });

  it('authenticates on correct OTP', () => {
    const store = createTestStore();
    let tree: TestRenderer.ReactTestRenderer;

    act(() => {
      tree = TestRenderer.create(
        <Provider store={store}>
          <OTPScreen />
        </Provider>,
      );
    });

    const input = findByTestId(tree!.root, 'otp-input');
    act(() => {
      input!.props.onChangeText(DEMO_OTP);
    });

    const verifyButton = findByTestId(tree!.root, 'otp-verify-button');
    act(() => {
      verifyButton!.props.onPress();
    });

    expect(store.getState().auth.isLoggedIn).toBe(true);
    expect(store.getState().auth.subscriberId).toBe('SUB123');
  });

  it('returns to login flow on logout', () => {
    const store = createTestStore();
    store.dispatch(setAuthenticated('SUB123'));

    let tree: TestRenderer.ReactTestRenderer;

    act(() => {
      tree = TestRenderer.create(
        <Provider store={store}>
          <HomeScreen />
        </Provider>,
      );
    });

    const logoutButton = findByTestId(tree!.root, 'logout-button');
    act(() => {
      logoutButton!.props.onPress();
    });

    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(store.getState().auth.subscriberId).toBeNull();
    expect(store.getState().auth.skipSplash).toBe(true);
  });
});
