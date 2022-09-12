class LoginPage{
    constructor(page){
        this.page = page;
        this.register = page.locator(".login-wrapper-footer-text");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginsubmit = page.locator("#login");
    }

    async goTo(){
        this.page.goto("https://rahulshettyacademy.com/client/");
    }
    async validLogin(id,pw){
        await this.username.fill(id);
        await this.password.fill(pw);
        await this.loginsubmit.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};