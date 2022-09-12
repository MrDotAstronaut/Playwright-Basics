const {expect} = require('@playwright/test');

class CartPage{
    constructor(page, productName){
        this.page = page;
        this.table = this.page.locator("div li");
        this.order = this.page.locator("h3:has-text('" + productName + "')");
        this.checkout = this.page.locator("text=Checkout");
    }
    async checkoutOrder(){
        await this.table.first().waitFor();
        expect(await this.order.isVisible()).toBeTruthy();
        await this.checkout.click();
    }
}

module.exports = {CartPage};