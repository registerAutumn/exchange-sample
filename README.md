### Exchange

### GET - /exchange/{sourceCurrency}/{targetCurrency}/{amount}

Calculate from source currency to target currency

**Sample Request**
`/exchange/jpy/HKD/99.9`

**Sample Response**
```json
{
    "from": "JPY",
    "to": "HKD",
    "rate": 0.067,
    "amount": 6.69
}
```

**Exception**
- Invalid source currency
- Invalid target currency

**Exception Response**
```
{
    "message": "Invalid target currency"
}
```

--- 

### POST - /exchange/{sourceCurrency}/{targetCurrency}/{rate}

Insert/Update from source currency to target currency exchange rate

**Sample Request**
`exchange/jpy/hkd/0.067`

**Sample Response**
```json
{
    "TWD": {
        "TWD": 1,
        "JPY": 3.669,
        "USD": 0.03281
    },
    "JPY": {
        "TWD": 0.26956,
        "JPY": 1,
        "USD": 0.00885,
        "HKD": 0.067
    },
    "USD": {
        "TWD": 30.444,
        "JPY": 111.801,
        "USD": 1
    }
}
```