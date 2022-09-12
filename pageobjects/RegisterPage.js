class RegisterPage {
    constructor(page) {
        this.page = page;
        this.register = page.locator(".login-wrapper-footer-text");
        this.firstname = page.locator("#firstName");
        this.lastname = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.number = page.locator("#userMobile");
        this.pwd = page.locator("#userPassword");
        this.confirmpwd = page.locator("#confirmPassword");
        this.checkbox = page.locator(".col-md-1 .ng-pristine");
        this.regsubmit = page.locator("#login");
        this.logbtn = page.locator(".btn.btn-primary");
    }
    async registration() {
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
    }
}