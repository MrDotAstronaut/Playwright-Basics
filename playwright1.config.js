const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries : 1,
  workers : 2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  
  projects : [
    {
      name : 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on', //off, on, only-on-failure
        trace: 'off', //off, on, retain-on-failure, on-first-retry
        video : 'off', //off, on, retain-on-failure, on-first-retry
        // viewport : {width : 720, height : 720}
        // ignoreHttpsErrors : true,
        // permissions : ['geolocation']
      }
    },
    {
      name : 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on', //off, on and retain-on-failure are the options
        // ...devices['iPhone 11']
      }
    },
  ]
};
module.exports = config;
