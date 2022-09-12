const {expect} = require('@playwright/test'); 
class OrderPlacedPage{
    constructor(page){
        this.page = page;
        this.message = page.locator(".hero-primary");
        this.orderNO = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async checkOrderSuccess(){
        await expect(this.message).toHaveText(" Thankyou for the order. ");
    }
    async getOrderID(){
        const orderID = await this.orderNO.textContent();
        const dummy1 = orderID.split(" ");
        const dummy2 = dummy1[2];
        return dummy2;
    }
}

module.exports = {OrderPlacedPage};