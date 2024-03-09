# EUCare Backend Assessment

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This repository contains the backend assessment for EUCare, developed using NestJS as the backend framework and TypeScript for writing code. The assessment involves implementing various endpoints and setting up the database structure using Prisma Migrate with PostgreSQL.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Start Dev Database Container

```bash
# start container
$ npm run db:dev:up
```

## Deploy Prisma Migration to Dev Database

```bash
# deploy
$ npm run prisma:dev:deploy
```

## Restart Dev Database Container

```bash
# restart
$ npm run db:dev:restart
```

## API endpoint

### Completed Endpoints

- User Registration (members)

  Users register with their phone number and password.
  Check if the phone number is duplicated, return an error message if duplicated.

- User Login

  Users login with their phone number and password.
  Validate account and password, return error message if incorrect or not registered.

- Get Patient Data List (patients)

  Retrieve patient data under the user (all fields).

- Create Patient Data (patients)

  Create patient data under the user (multiple patients per user).
  Patient fields: Name, ID number, Date of birth, Address.
  Check if there is a duplicate ID number in the system, prevent creation and return error.

- Add Patient Appointment Slot

  Reserve appointment slot for patient with consultation content, date, and time.

### Database Structure Setup

Prerequisites: PostgreSQL
Utilize Prisma Migrate to establish database structure based on the requirements.
Create migration data using Prisma Migrate.

## Stay in touch

- Email - [Shao Hsien, Lu](reborn7875@gmail.com)
- GitHub - [https://github.com/marvelshan](https://github.com/marvelshan)
- LinkedIn - [@LinkedIn](https://www.linkedin.com/in/%E7%B4%B9%E8%B3%A2-%E5%91%82-537404115/)
