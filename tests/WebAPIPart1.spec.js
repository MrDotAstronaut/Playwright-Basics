const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail: "carnival3@gmail.com", userPassword: "Abcd1234!"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6262e9d9e26b7e1a10e89c04"}]};
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
    page.locator("[routerlink='/dashboard/myorders']").click();
    const table = page.locator("tbody tr");
    await table.first().waitFor();
    const row = table.locator("th[scope='row']");
    for(let i = 0; await table.count(); i++){
        if(await row.nth(i).textContent() == response.orderID){
            await table.nth(i).locator(".btn-primary").click();
            break;
        }
    }
    await expect(page.locator(".col-text")).toHaveText(response.orderID);
})