# Synth

Synth is the latest intersection between music and gaming. This addictive web game syncs game difficulty with your preferred playlist, and gives you an unique experience every time you load a new song. Tee up your favorite playlist for hours of addictive play and listening.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team-astonishingmosquito)
1. [Contribute](#contributions)

## Usage

Start playing now at [http://www.synthgame.com] (http://www.synthgame.com)

## Requirements

- React
- Redux
- Redis
- PIXI
- RXJS
- NodeJS
- Express

## Installing Dependencies

Install Redis
```
brew install redis
```

then, from within the root directory:

```
npm install
```
```
npm start
```


## Possible Directions
- [ ] Multiplayer
- [ ] Collectable beatboxes (It's already mostly hooked up for movement)
- [ ] Leaderboards
- [ ] Multiple filter types (lowpass + bandpass + highpass filter, literally just setting a type)
- [ ] Magik

## Technical Improvements
- [ ] Store the ideal threshold (AudioController->GetIdealThreshold) in the database. This will improve load times ~75%.


## Architecture
The client and the server are completely separate
Implements a couple of core paradigms from http://gameprogrammingpatterns.com/ -- specifically the Observer pattern and the Command pattern.
Webapp surrounding the game has a typical redux store and fetches songs from the server.
The game also has a redux store in which all game entities and game controllers are stored. This is to avoid globals/singletons.
Webapp listens to the Game store via the Game->addEventListener method.
Feel free to ask questions.

## Orienting in the Codebase

1. Start at client/index.js, App, AppStore
2. navigate to the clientapp directory, familiarize with LibraryView, LibraryModel
3. Familiarize with GameView, GameModel
4. Navigate to the client/game directory, familiarize with Game.js, GameStore
5. Entity, Player, Beatbox, Wave
6. Controller, CollisionDetector, AudioController

## Team AstonishingMosquito

  - __Architecture and Code Review__: Shea Hawkins
  - __Git Management and Deployment__: Jay Arella
  - __Project Management__: Jennifer Ong

## Contributions

See our [Style Guide](_STYLE-GUIDE.md) and [Contribution Guidelines](_CONTRIBUTING.md) for reference
