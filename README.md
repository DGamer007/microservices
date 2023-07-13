# Microservices Assignment With RabbitMQ Integration

## How to run the Application ?

- Open terminal in Project Directory
- Run `npm install` to install Project dependencies
- Setup `.env` file from `.env.sample`
- Run `npm run start:dev` to start the `GATEWAY` in development Environment
  OR
- Run `npm run start` to start the `GATEWAY` service in production Environment
- #### Start Other Services [*Auth*,*User*,*Post*,*Comment*]

  - Open terminal in Service Directory [*apps/*<*auth* | *user* | *post* | *comment*>]
  - Run `npm install` to install dependencies
  - Setup `.env` file from `.env.sample`'
  - Run `npm run start:dev` to start `SERVICE` in development Environment
  - Services can run as a standalone Application in Development Environment only...
    - Provide `MODE="RUN_AS_APP"` in .env file
  - Run `npm run start` to start `SERVICE` in production Environment
  - Once a service has been started, it will register itself to the Gateway with
    - KEY
    - VERSION
    - PORT
  - #### Key and Version of Service can be provided as Command Line Argument while starting the Service
    - `npm run start -- <key> <version>`
    - `npm run start -- auth v2`
    - If not provided then Default Key and Version will be assigned from ENV

- After Starting services, Every endpoint of each service can be accessed via Gateway, with `[gateway_url]/[service_key]/[service_version]/[path]`
