const {test, expect} = require('@playwright/test');

test("Popup Validations", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href='lifetime-access']:visible").click();
    const text = await frame.locator(".text h2 span").textContent();
    console.log(text);
});

test("Screenshot and Visual Comparison", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path : 'Screenshot/screenshot1.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path : 'Screenshot/screenshot2.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

})

test.only('Visual Check', async ({page}) => {
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})