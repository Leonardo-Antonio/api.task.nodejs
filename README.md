# API REST - User tasks

- Endpoint users
    - /users [GET]
    - /users [POST]
    - /users [PUT]
    - /users/:ID [GET]
    - /users/:ID [DELETE]
    
- Struct JSON /users [POST, PUT]
```json
    {
      "id": number?,
      "name": string,
      "last_name": string,
      "email": string,
    }
```
- Endpoint tasks
    - /tasks [GET]
    - /tasks [POST]
    - /tasks [PUT]
    - /tasks/:ID [GET]
    - /tasks/:ID [DELETE]

- Struct JSON /users [POST, PUT]
    ```json
        {
          "id": number?,
          "title": string,
          "body": string,
          "user_id": number,
        }
    ```


```javascript
    npm init --y
```

```javascript
    npm i typescript -D
```

```javascript
    npx typescript --init
```

```javascript
    npm i express
```

```javascript
    npm i @types/express -D
```

```javascript
    npm i nodemon -D
```

- ir al package.json
```json
    "scripts": {
        "build": "tsc",
        "dev": "nodemon src/index.ts --exec ts-node"
    },
```
```npm
    npm i ts-node -D
```

```npm
    npm i morgan
```

```npm
    npm i @types/morgan -D
```

```npm
    npm i mysql2
```