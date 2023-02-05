# CRUD-API

### Простой CRUD API с использованием базы данных в памяти приложения
### Задача: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

## Установка:
- Use 18 LTS version of Node.js
- В корне проекта:
- npm install
- npm run tests - запуск тестов
- npm run start:dev - запуск сервера в режиме разработки
- npm run start:prod - сборка и запуск сервера в режиме production

## API:
- GET api/users is used to get all persons
- GET api/users/${userId}
- POST api/users is used to create record about new user and store it in database
- PUT api/users/{userId} is used to update existing user
- DELETE api/users/${userId} is used to delete existing user from database

## Users are stored as objects that have following properties:
- id — unique identifier (string, uuid) generated on server side
- username — user's name (string, required)
- age — user's age (number, required)
- hobbies — user's hobbies (array of strings or empty array, required)

Проект выполнен на node.js без использования фреймворков.