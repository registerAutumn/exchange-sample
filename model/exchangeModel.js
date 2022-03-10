
var exchangeRate = {
    "TWD": {
        "TWD": 1,
        "JPY": 3.669,
        "USD": 0.03281
    },
    "JPY": {
        "TWD": 0.26956,
        "JPY": 1,
        "USD": 0.00885
    },
    "USD": {
        "TWD": 30.444,
        "JPY": 111.801,
        "USD": 1
    }
};

let initRate = () => {
    this.rate = {
        "TWD": {
            "TWD": 1,
            "JPY": 3.669,
            "USD": 0.03281
        },
        "JPY": {
            "TWD": 0.26956,
            "JPY": 1,
            "USD": 0.00885
        },
        "USD": {
            "TWD": 30.444,
            "JPY": 111.801,
            "USD": 1
        }
    }
}

let updateExchangeRate = function(from, to, rate) { 
    from = from.toUpperCase();
    to = to.toUpperCase();
    if (rate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    if (!exchangeRate[from]) {
        exchangeRate[from] = {};
    }
    exchangeRate[from][to] = rate;
    return exchangeRate;
}

let calculateExchange = function(from, to, amount) { 
    from = from.toUpperCase();
    to = to.toUpperCase();
    if (!exchangeRate[from]) {
        throw new Error('Invalid source currency');
    }
    if (!exchangeRate[from][to]) {
        throw new Error('Invalid target currency');
    }
    if (amount <= 0) {
        throw new Error('Invalid amount');
    }
    amount = parseFloat(amount.toString()) * exchangeRate[from][to];
    amount = Math.floor(amount * 100.0 + 0.5) / 100.0;
    return {
        from: from,
        to: to,
        rate: exchangeRate[from][to],
        amount: amount.toLocaleString('en-US', {minimumFractionDigits: 2}),
    }
}

module.exports = {
    rate: exchangeRate,
    initRate: initRate,
    updateExchangeRate: updateExchangeRate,
    calculateExchange: calculateExchange,
}