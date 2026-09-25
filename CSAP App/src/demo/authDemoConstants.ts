export const DEMO_OTP = '123456';
export const SPLASH_DELAY_MS = 1200;

export function isDemoOtpValid(otp: string): boolean {
  return otp === DEMO_OTP;
}
