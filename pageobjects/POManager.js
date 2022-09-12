const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const { OrderReviewPage } = require('../pageobjects/OrderReviewPage');
const { OrderPlacedPage } = require('../pageobjects/OrderPlacedPage');
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage');

class POManager{
    constructor(page, productName){
        this.page = page;
        this.lp = new LoginPage(this.page);
        this.dp = new DashboardPage(this.page);
        this.cp = new CartPage(this.page, productName);
        this.orp = new OrderReviewPage(this.page);
        this.opp = new OrderPlacedPage(this.page);
        this.ohp = new OrderHistoryPage(this.page);
    }
    getLoginPage(){
        return this.lp;
    }
    getDashboardPage(){
        return this.dp;
    }
    getCartPage(){
        return this.cp;
    }
    getOrderReviewPage(){
        return this.orp;
    }
    getOrderPlacedPage(){
        return this.opp;
    }
    getOrderHistoryPage(){
        return this.ohp;
    }

}

module.exports = {POManager};