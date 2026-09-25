import authReducer, {
  resetAuth,
  setAuthenticated,
} from '../store/slice/auth/authReducer';
import { DEMO_OTP, isDemoOtpValid } from '../demo/authDemoConstants';

describe('authReducer', () => {
  it('marks user authenticated with subscriber id', () => {
    const state = authReducer(undefined, setAuthenticated('SUB123'));

    expect(state.isLoggedIn).toBe(true);
    expect(state.subscriberId).toBe('SUB123');
    expect(state.skipSplash).toBe(true);
  });

  it('clears session on logout and skips splash on next auth entry', () => {
    const loggedIn = authReducer(undefined, setAuthenticated('SUB123'));
    const loggedOut = authReducer(loggedIn, resetAuth());

    expect(loggedOut.isLoggedIn).toBe(false);
    expect(loggedOut.subscriberId).toBeNull();
    expect(loggedOut.skipSplash).toBe(true);
  });
});

describe('isDemoOtpValid', () => {
  it('accepts demo otp', () => {
    expect(isDemoOtpValid(DEMO_OTP)).toBe(true);
  });

  it('rejects invalid otp', () => {
    expect(isDemoOtpValid('000000')).toBe(false);
  });
});
