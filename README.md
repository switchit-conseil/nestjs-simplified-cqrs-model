# A simplified CQRS model with NestJS for building GraphQL and Rest APIs

<p align="center">
  <a href="http://switchit-conseil.com/" target="blank">
    <img src="https://switchit-conseil.com/wp-content/uploads/2019/08/switch-it-logo-1.png" width="320" alt="SwitchIt - Conseil Logo" />
  </a>
</p>

<p align="center"><strong>We build your next generation software !</strong></p>

<p align="center">
<strong>Built with</strong>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>


## Description

This repository is for illustrating our blog article that can be found here: 
[A simplified CQRS model with NestJS]() (I am sorry the article is in french)

## Installation

```bash
$ yarn install
$ docker stack deploy switchit --compose-file=./docker-compose.yml
```

## Running the app

```bash
# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testing the API

### Graphql

Once started you can browse to http://localhost:3000/graphql to open the GraphQL PlayGround given with the
application.

### Rest API

You can register a user using:

```
$ curl -d '{"email":"contact@switchit-conseil.com", "password":"changeme"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users
```

## Support

This is an MIT-licensed open source project. It is for demonstration only for the purpose of our blog  article.

## Stay in touch

- Author - [SWITCH IT - CONSULTING](mailto:contact@switchit-conseil.com)
- Website - [https://switchit-conseil.com](https://switchit-conseil.com)

## License

  This project is [MIT licensed](LICENSE).
