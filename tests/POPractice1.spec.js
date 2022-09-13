const { test } = require("../utils/TestBase");
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/POPracticeTestData.json")));

test('@Web E2E', async ({ page, testDataForOrder }) => {

    const pom = new POManager(page, testDataForOrder.productName);
    const lp = pom.getLoginPage();
    await lp.goTo();
    await lp.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dp = pom.getDashboardPage();
    await dp.searchProduct(testDataForOrder.productName);
    await dp.navigateToCart();

    const cp = pom.getCartPage();
    await cp.checkoutOrder();

    const orp = pom.getOrderReviewPage();
    await orp.reviewOrder(testDataForOrder.username, testDataForOrder.countrySearch);

    const opp = pom.getOrderPlacedPage();
    await opp.checkOrderSuccess();
    const orderID = await opp.getOrderID();

    const ohp = pom.getOrderHistoryPage();
    await ohp.verifyOrder(orderID);
})
