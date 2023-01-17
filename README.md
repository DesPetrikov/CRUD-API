# CRUD-API
## About
Assignment [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Installation
* clone repository to your computer: `git clone git@github.com:DesPetrikov/CRUD-API.git`
* open it in your IDE 
* change branch to **dev**: `git checkout dev`
* install all necessary dependencies: `npm install` 

## Run
* Run server in development mode: `npm run start:dev`
* Run server in production mode: `npm run start:prod`
* Run tests: `npm run test`  
Server runs on port, which pointed in `.env` file. Just rename `.env.example` into `.env`. If you won't do it, server runs on  port **4000**. After server running you may open API platform like **Postman** to test server.

## Available endpoints
- **GET** `api/users` is used to get all users
- **GET** `api/users/{userId}` get particular user
- **POST** `api/users`  create record about new user and store it in database
- **PUT** `api/users/{userId}` update existing user
- **DELETE** `api/users/{userId}` delete existing user from database

## Mandatory user fields 
For **POST** and **PUT** requests you should type mandatory user fields.   
`username` — user's name (string)  
`age` — user's age (number)  
`hobbies` — user's hobbies (array of strings or empty array)  

