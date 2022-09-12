const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on' //off, on and retain-on-failure are the options
  }
};
module.exports = config;
