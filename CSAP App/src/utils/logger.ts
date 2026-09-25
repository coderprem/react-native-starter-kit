/* eslint-disable no-console */
class Logger {
  devMode = __DEV__;

  log(...args) {
    if (this.devMode) {
      console.log(...args);
    }
  }

  warn(...args) {
    if (this.devMode) {
      console.warn(...args);
    }
  }

  error(...args) {
    if (this.devMode) {
      console.error(...args);
    }
  }
}

export default new Logger();
