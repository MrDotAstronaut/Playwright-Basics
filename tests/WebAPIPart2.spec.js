const {test, expect} = require('@playwright/test');
const id = "thomas5@gmail.com";
let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginsubmit = page.locator("#login");
    await username.fill(id);
    await password.fill("Abcd1234!");
    await loginsubmit.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext = await browser.newContext({storageState : 'state.json'});

});

test('TC001', async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const productName = 'iphone 13 pro';
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i = 0; i < count; i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink$=cart]").click();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('iphone 13 pro')").isVisible()).toBeTruthy();
    await page.locator("text=Checkout").click();
    const user = page.locator(".details__user label");
    await expect(user).toHaveText(id);
    await page.locator("[placeholder='Select Country']").type("ind", {delay : 100});
    await page.locator(".ta-results").waitFor();
    const item = page.locator(".ta-item");
    const country = " India";
    for(let i = 0; i < await item.count(); i++){
        if(await item.nth(i).textContent() === country){
            await item.nth(i).click();
            break;
        }
    }
    await page.locator(".btnn").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const dummy1 = orderID.split(" ");
    const dummy2 = dummy1[2];
    console.log(dummy2);
    page.locator("label[routerlink='/dashboard/myorders']").click();
    const table = page.locator("tbody tr");
    await table.first().waitFor();
    const row = table.locator("th[scope='row']");
    for(let i = 0; await table.count(); i++){
        if(await row.nth(i).textContent() == dummy2){
            await table.nth(i).locator(".btn-primary").click();
            break;
        }
    }
    await expect(page.locator(".col-text")).toHaveText(dummy2);
});
