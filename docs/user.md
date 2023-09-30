# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
    "data": {
        "username": "arief",
        "name": "Arief Rachman Hakim",
        "password": "rahasia"
    }
}
```

Response Body Success :

```json
{
    "data": {
        "username": "arief",
        "name": "Arief Rachman Hakim"
    }
}
```

Response Body Error :

```json
{
    "erros": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "arief",
    "password": "rahasia"
}
```

Response Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error :

```json
{
    "erros": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

-   Authorization : token

Request Body :

```json
{
    "name": "updated arief", //optional
    "password": "new password" //optional
}
```

Response Body Success :

```json
{
    "data": {
        "username": "arief",
        "name": "updated arief"
    }
}
```

Response Body Error :

```json
{
    "erros": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "data": {
        "username": "arief",
        "name": "Arief Rachman Hakim"
    }
}
```

Response Body Error :

```json
{
    "erros": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "erros": "Unauthorized"
}
```
