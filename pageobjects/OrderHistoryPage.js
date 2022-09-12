const {expect} = require('@playwright/test');

class OrderHistoryPage{
    constructor(page){
        this.page = page;
        this.ordersBtn = this.page.locator("label[routerlink='/dashboard/myorders']");
        this.table = this.page.locator("tbody tr");
        this.row = this.table.locator("th[scope='row']");
        this.column = this.page.locator(".col-text");
    }

    async verifyOrder(dummy2){
        this.ordersBtn.click();
        await this.table.first().waitFor();
        for (let i = 0; await this.table.count(); i++) {
            if (await this.row.nth(i).textContent() == dummy2) {
                await this.table.nth(i).locator(".btn-primary").click();
                break;
            }
        }
        await expect(this.column).toHaveText(dummy2);
    }
}

module.exports = {OrderHistoryPage};