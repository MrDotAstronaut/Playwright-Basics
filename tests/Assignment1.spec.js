const {test, expect} = require('@playwright/test');

test('Part 1', async ({page}) => {

    const register = page.locator(".login-wrapper-footer-text");
    const firstname = page.locator("#firstName");
    const lastname = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const number = page.locator("#userMobile");
    const pwd = page.locator("#userPassword");
    const confirmpwd = page.locator("#confirmPassword");
    const checkbox = page.locator(".col-md-1 .ng-pristine");
    const regsubmit = page.locator("#login");
    const logbtn = page.locator(".btn.btn-primary");
    await page.goto("https://rahulshettyacademy.com/client/");

    // await register.click();
    // await firstname.fill("John");
    // await lastname.fill("Thomas");
    // await email.fill("thomas5@gmail.com");
    // await number.fill("1234512345");
    // await pwd.fill("Abcd1234!")
    // await confirmpwd.fill("Abcd1234!");
    // await checkbox.click();
    // await regsubmit.click();
    // await logbtn.click();

    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginsubmit = page.locator("#login");
    const id = "thomas5@gmail.com";
    await username.fill(id);
    await password.fill("Abcd1234!");
    await loginsubmit.click();

    //when app is service oriented load state can bbe checked to make sure all webelements are loaded.

    await page.waitForLoadState('networkidle');
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

    //isVisible() does not support an inbuilt wait mechanism.
    //So to avoid error give waitFor() command before on element which confirms elements are loaded.

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
})
