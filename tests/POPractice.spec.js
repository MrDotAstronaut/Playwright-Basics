const { test } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/POPracticeTestData.json")));

//parallel mode means that all tests within the file will be run on seperate instances.
//test.describe.configure({mode : 'parallel'});

//serial mode means that all tests within the file are considered interdependant. 
//So if one test fails the execution will be stopped to save time.
//test.describe.configure({mode : 'serial'});

for (const data of dataset) {
    test(`E2E for ${data.productName}`, async ({ page }) => {

        const pom = new POManager(page, data.productName);
        const lp = pom.getLoginPage();
        await lp.goTo();
        await lp.validLogin(data.username, data.password);

        const dp = pom.getDashboardPage();
        await dp.searchProduct(data.productName);
        await dp.navigateToCart();

        const cp = pom.getCartPage();
        await cp.checkoutOrder();

        const orp = pom.getOrderReviewPage();
        await orp.reviewOrder(data.username, data.countrySearch);

        const opp = pom.getOrderPlacedPage();
        await opp.checkOrderSuccess();
        const orderID = await opp.getOrderID();

        const ohp = pom.getOrderHistoryPage();
        await ohp.verifyOrder(orderID);
    })
}
