const assert = require('assert');
const { expect } = require('chai');
const exchange = require("../model/exchangeModel");

describe("Test exchange calculate", () => {
    beforeEach(() => {
        exchange.initRate();
    })
    it("Test unavailable input", async () => {
        assert.throws(() => {
            exchange.calculateExchange("EUR", "EUR", 100)
        }, Error, 'Invalid source currency');
        assert.throws(() => {
            exchange.calculateExchange("USD", "EUR", 100)
        }, Error, 'Invalid target currency');
        assert.throws(() => {
            exchange.calculateExchange("USD", "TWD", -100)
        }, Error, 'Invalid amount');
    })
    it("Test calculate", async () => {
        let result = await exchange.calculateExchange("USD", "TWD", 100);
        expect(result.from).to.equal("USD");
        expect(result.to).to.equal("TWD");
        expect(result.rate).to.equal(30.444);
        expect(result.amount).to.equal('3,044.40');

        result = await exchange.calculateExchange("JPY", "TWD", 100);
        expect(result.from).to.equal("JPY");
        expect(result.to).to.equal("TWD");
        expect(result.rate).to.equal(0.26956);
        expect(result.amount).to.equal('26.96');
    })
    it("Test non case-sensitive", async () => {
        let result = await exchange.calculateExchange("USD", "twd", 100);
        expect(result.from).to.equal("USD");
        expect(result.to).to.equal("TWD");
        expect(result.rate).to.equal(30.444);
        expect(result.amount).to.equal('3,044.40');

        result = await exchange.calculateExchange("jpy", "twd", 100);
        expect(result.from).to.equal("JPY");
        expect(result.to).to.equal("TWD");
        expect(result.rate).to.equal(0.26956);
        expect(result.amount).to.equal('26.96');
    })
});

describe("Test update exchange rate", () => {
    beforeEach(() => {
        exchange.initRate();
    })
    it("Insert new exchange rate", async () => {
        await exchange.updateExchangeRate("USD", "EUR", 1.1);
        assert.equal(1.1, exchange.rate["USD"]["EUR"]);
        assert.equal(300 * 1.1, exchange.calculateExchange("USD", "EUR", 300).amount);
    });
    it("Update exchange rate", async () => {
        await exchange.updateExchangeRate("TWD", "USD", 1.2);
        assert.equal(1.2, exchange.rate["TWD"]["USD"]);
        assert.equal('120.00', exchange.calculateExchange("TWD", "USD", 100).amount);
    });
    it("Update exchange rate with unavailable rate", async() => {
        assert.throws(() => {
            exchange.updateExchangeRate("TWD", "USD", -10);
        }, Error, 'Invalid exchange rate');
    });
});

describe("Test insert/update exchange rate, non case-sensitive", () => {
    beforeEach(() => {
        exchange.initRate();
    })
    it("Insert new exchange rate, non case-sensitive", async () => {
        await exchange.updateExchangeRate("usd", "eur", 1.1);
        assert.equal(1.1, exchange.rate["USD"]["EUR"]);
        assert.equal(300 * 1.1, exchange.calculateExchange("USD", "EUR", 300).amount);
    });
    it("Update exchange rate, non case-sensitive", async () => {
        await exchange.updateExchangeRate("TWD", "usd", 1.2);
        assert.equal(1.2, exchange.rate["TWD"]["USD"]);
        assert.equal('120.00', exchange.calculateExchange("twd", "usd", 100).amount);
    });
    it("Update exchange rate with unavailable rate, non case-sensitive", async() => {
        assert.throws(() => {
            exchange.updateExchangeRate("TWD", "usd", -10);
        }, Error, 'Invalid exchange rate');
    });
});