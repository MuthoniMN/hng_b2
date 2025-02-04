# Number API
This is a simple API that returns properties for a specified number

## Tech Stack
- Node
- Express

## API Docs
Endpoint: GET `/api/classify-number?number=?`
Responses:

- 200 - application/json
```
{
    "number":4,
    "is_prime":false,
    "is_perfect":false,
    "properties":["even"],
    "fun_fact":"4 is the number of movements in a symphony.",
    "digits_sum":4
}
```
- 400 - application/json
```
{
    "number":"alphabet",
    "error":true
}
```
- 500 - application/json
```
{
    "error": true,
    "message": "Internal server error!"
}
```
