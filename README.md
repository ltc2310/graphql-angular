# Angular with graphql

How to integrate graphql into angular

## Project structure

```bash
src
   - app
       - courses
               - course
                      - course component
               - course-list
                      - course-list component
               - courses component

       - shared
               - course.model.ts
               - course.service.ts

      - app component
      - graphql.module.ts
      - app.module.ts
               
```

## Installation
### graphql server
- Clone graphql-server [Here](https://github.com/ltc2310/graphql-server)
- install package graphql server:
```bash
npm install
```
- start server
```bash
node server.js
```
### graphql client (angular)

- install package

```bash
npm install
```
- start
```bash
ng serve
```

## Guideline

- Follow docment [Here](https://codedeom.com/2020/05/23/su-dung-graphql-trong-angular-nhu-the-nao/)

## Document
[Graphql for angular](https://www.apollographql.com/docs/angular/)