const {expect} = require('@playwright/test');

class OrderReviewPage{
    constructor(page){
        this.page = page;
        this.user = this.page.locator(".details__user label");
        this.country = this.page.locator("[placeholder='Select Country']");
        this.results = this.page.locator(".ta-results");
        this.item = this.page.locator(".ta-item");
        this.button = this.page.locator(".btnn");
    }

    async reviewOrder(id,countrySearch){
        await expect(this.user).toHaveText(id);
        await this.country.type("ind", { delay: 100 });
        await this.results.waitFor();
        for (let i = 0; i < await this.item.count(); i++) {
            if (await this.item.nth(i).textContent() === countrySearch) {
                await this.item.nth(i).click();
                break;
            }
        }
        await this.button.click();
    }
}

module.exports = {OrderReviewPage};