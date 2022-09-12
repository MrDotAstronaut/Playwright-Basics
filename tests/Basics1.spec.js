const {test, expect} = require('@playwright/test');

//without async the await keyword has no meaning
//instead of giving function(){} we can give () => {}
//browser parameter needs to be passed when custom properties need to be defined for the browser

test('TC001', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://bing.com");
    console.log(await page.title());
});

//if default properties are fine then directly provide page parameter
//when we give only then only that test case will trigger during run

test('TC002', async ({page}) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('TC003', async ({page}) => {
    const username = page.locator("#username");
    const password = page.locator("#password");
    const submit = page.locator("#signInBtn");
    const cardtitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.type("johnthomas");
    await password.type("abcd1234");
    await submit.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    
    //Since javascript is asynchronous in nature. Each steps returns a promise object.
    //To resolve this we are using await
    
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    
    //If we directly give page.waitForNavigation() the playwright won't know when to wait.
    //For this purpose we wrap the statement in promise and in [] block add the steps.
    //This means page.waitForNavigation() is told to wait after the click.

    await Promise.all([
        page.waitForNavigation(),
        await submit.click()
    ]);
    // console.log(await cardtitles.first().textContent());
    // console.log(await cardtitles.nth(0).textContent());

    //allTextContents() does not an inbuilt wait mechanism as a list can be empty.
    const alltitles = await cardtitles.allTextContents();
    console.log(alltitles);
});

test('TC004', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const password = page.locator("#password");
    const submit = page.locator("#signInBtn");
    const radio = page.locator(".radiotextsty");
    const okbtn = page.locator("#okayBtn");
    const dropdown = page.locator("select.form-control");
    const agree = page.locator("#terms");
    const blinktext = page.locator("[href*=documents-request]");
    await radio.last().click();
    await okbtn.click();
    //Action is performed outside hence await is outside 
    await expect(radio.last()).toBeChecked;
    await dropdown.selectOption("consult");
    //await page.pause();
    await agree.click();
    await expect(agree).toBeChecked();
    await agree.uncheck();
    //Action is performed inside the assertion hence await is inside
    expect(await agree.isChecked()).toBeFalsy();
    await expect(blinktext).toHaveAttribute("class", "blinkingText");
});

test('TC005', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinktext = page.locator("[href*=documents-request]");
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        await blinktext.click()
    ]);
    const text = await newPage.locator(".im-para.red").textContent();
    const arraytext = text.split("@");
    const email = arraytext[1].split(" ");
    console.log(email[0]);
    const username = page.locator("#username");
    await page.pause();
    await username.fill(email[0]);
});