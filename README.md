# Pokemon RPS
Pokemon Rock-Paper-Scissors (RPS) is a full stack web application that allows you to play as a trainer with
a pokemon companion as your train and battle your way and eventually become the pokemon champion!

## Motivation
This project was to create a more complex full stack application using one of my favorite games as inspiration. Note that the ideas for the game, UI design and code is created and written by me.

# Plan
|Phase|Date| Name | Description|
|:---|:---|:---|:---|
| **1** |**2020/09/15**|**Fundamentals**|**Create UI and CRUD APIs for Pokemon + Trainers** | 
| 2 |TBD|Battle| Select a Pokemon Companion and create the pokemon RPS battle system|
| 3 |TBD|Gyms| Add in various gym leaders and the elite 4| 
| 4 |TBD|Account| Add in login/authentication for trainers|
| 5 |TBD|Money/Items| Add in money and items|
| 6 |TBD|Pokedex + Capture| Create a pokedex and capturing of pokemon |
| 7 |TBD|Achievements| Add achievements to the game |

## Tech/Framework Used

* React
* Node.js
* Express.js
* MongoDB

## Usage
Ensure you have installed node, npm and a local mongoDB server (see https://docs.mongodb.com/manual/installation/ for details)


### Initial setup 
Clone the repo
```sh
https://github.com/TimmyHo/pokemon_rps.git
```

Seed the database with original pokemon and some test trainers
```sh
cd server
npm run seed-p
npm run seed-t
```

Install node packages
```sh
cd server
npm install

cd client
npm install
```

### To run Pokemon RPS locally
In one terminal window (frontend client)
```sh
cd client
npm run start
```

In another terminal window (backend server)
```sh
cd server
npm run start
```

In a web browser, navigate to http://localhost:3000
