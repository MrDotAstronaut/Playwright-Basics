const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail: "carnival1@gmail.com", userPassword: "Abcd1234!"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
const fakeOrderPayload = {data: [], message: "No Orders"};
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Part 1', async ({page}) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("[routerlink='/dashboard/myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=631dfbabc4d0c51f4f1d522a",
    route => route.continue({url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=631ec426c4d0c51f4f1dae3e"}));
    await page.locator(".btn-primary").first().click();
})