
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

let updateExchangeRate = function(from, to, rate) { 
    if (from === to || rate <= 0) {
        return;
    }
    if (!exchangeRate[from]) {
        exchangeRate[from] = {};
    }
    exchangeRate[from][to] = rate;
    return exchangeRate;
}

let calculateExchange = function(from, to, amount) { 
    if (!exchangeRate[from]) {
        throw new Error('Invalid source currency');
    }
    if (!exchangeRate[from][to]) {
        throw new Error('Invalid target currency');
    }
    amount = amount * exchangeRate[from][to];
    amount = Math.floor(amount * 100.0 + 0.5) / 100.0;
    return {
        from: from,
        to: to,
        rate: exchangeRate[from][to],
        amount: amount,
    }
}

module.exports = {
    rate: exchangeRate,
    updateExchangeRate: updateExchangeRate,
    calculateExchange: calculateExchange,
}