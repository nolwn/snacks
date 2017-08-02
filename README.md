# Galvanize Snacks

Your goal is to create an application to review and rate your favorite snacks!

This repo includes some files to get you started, but it's up to you to finish these user stories:

- User can view all snacks
- User can view details of individual snacks
- User can signup and login
- User can post a review of a snack
- User can edit a review of a snack
- User can delete a review of a snack
- User cannot edit/delete other users reviews

Here is the ERD representing the tables and columns needed:

![](./snacks_erd.jpg)

The migrations and seeds for the `snacks` table are included. You will need to implement the `users` and `reviews` tables yourself following this relationship.


| Request Method | Request URL        | Request Body                                                                                                        | Response Status | Response Body                                                  |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------------------------|
| `POST`         | `/users`           | `{ "first_name": "John", "last_name": "Siracusa", "email": "john.siracusa@gmail.com", "password": "ilikebigcats" }` | `200`           | `{ id: 2, "first_name": "John", "last_name": "Siracusa", ... } |

## Setup

Start by forking and cloning this project.
Then install all dependencies
```
cd galvanize-snacks
npm install
```

Create the development database:

```
createdb snacks_dev
```

and run migrations and seeds:

```
npm run knex migrate:latest
npm run knex seed:run
```
