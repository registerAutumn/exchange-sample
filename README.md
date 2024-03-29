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
    "amount": "6.69"
}
```

**Exception**
- Invalid source currency
- Invalid target currency
- Invalid amount

**Exception Response**
```
{
    "message": "Invalid target currency"
}
```

--- 

### POST - /exchange/

Insert/Update from source currency to target currency exchange rate

**Sample Request**

`/exchange/`

**Sample Body**

```json
{
    "source": "jpy",
    "target": "hkd",
    "rate": 0.067
}
```

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

**Exception**
- Invalid exchange rate

**Exception Response**
```
{
    "message": "Invalid exchange rate"
}
```
