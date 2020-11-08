# MyTasks - API

MyTasks REST API based on Node.js.

## Live demo

You can try this API [here](https://mytasks0.herokuapp.com/).

## Requirement

To run this API locally you need :

**Node.js** and **NPM**

Available on https://nodejs.org/.
To update NPM:

```sh
npm install --global npm
```

**MongoDB**

Available on https://www.mongodb.com/try/download/community.

## Use

To run the API, open a terminal at the root project. To install all the dependencies :

```sh
npm install
```

Then, run mongoDB.
Now you can run the API by running the command :

```sh
npm start
```

## Endpoints

> Base URL for all endpoints `http://localhost:5000/

### /

`GET /`

return the user if the jwt token send is correct.

### /auth

`POST /auth/register`

register a new account to MyTasks.

**Query parameters**

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| email     | String | The account email    |
| password  | String | The account password |

`POST /auth/login`

login to a MyTasks account.

**Query parameters**

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| email     | String | The account email    |
| password  | String | The account password |

### /api/v1/todos

`GET /api/v1/todos`

return the todo list of the user connected.

`POST /api/v1/todos`

create a new task.

**Query parameters**

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| title     | String | The name of the task |

`DELETE /api/v1/todo/:id`

delete the task with the id in the url.

### /api/v1/users

`GET /api/v1/users`

return the list of all MyTasks users.

`PATCH /api/v1/users/:id`

Edit the user with the id in the url.

**Query parameters**

| Parameter | Type    | Description          |
| --------- | ------- | -------------------- |
| email     | String  | The account email    |
| password  | String  | The account password |
| role      | String  | The account role     |
| active    | Boolean | The account status   |

## Model

**User** A MyTasks account.

`{ "_id": "5f3d869ae604415e7872969d", "email": "user@email.com", "password": "$2a$12$ON5TOyIbVNR25kmtQR6a4.kql5vTLguzBRMsxw2Izm4/fORwh3A4y", "role": "user", "active": true}`

**Todo** A task of one account.

`{ "_id": "5f95c4534792b1040e984f34", "title": "Eat", "user_id": 5f94c0a8b1d5b02db53d2402}`
