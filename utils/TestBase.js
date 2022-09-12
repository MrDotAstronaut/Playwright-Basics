const base = require('@playwright/test');

exports.test = base.test.extend({
    testDataForOrder : {
        username: "carnival3@gmail.com",
        password: "Abcd1234!",
        productName: "iphone 13 pro",
        countrySearch: " India"
    }
})