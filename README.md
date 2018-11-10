# Simple RESTful API Gateway

TODO: Update README

```
{
  "GET": [
    {
      "path": "/api",
      "func": "welcome"
    },
    {
      "path": "/api/user/:id",
      "middlewares": ["authorize"],
      "func": "user"
    }
  ],
  "POST": [
    {
      "path": "/auth",
      "middlewares": ["authenticate"],
      "func": "authenticate"
    },
    {
      "path": "/api/user",
      "middlewares": ["authorize"],
      "func": "user"
    }
  ],
  "PUT": [],
  "DELETE": []
}
```