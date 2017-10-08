# SelfBot
[![Build Status](https://travis-ci.org/GummiWummiBear/SelfBot.svg?branch=master)](https://travis-ci.org/GummiWummiBear/SelfBot)
[![Dependencies Status](https://david-dm.org/gummiwummibear/selfbot/status.svg)](https://david-dm.org/gummiwummibear/selfbot)

Discord SelfBot made in Discord.js.

# Setup
Make sure you have Nodejs 8.6.0 or higher installed.
To install dependencies, run `npm install`

# Config
~~Rename  `config_example.json` to `config.json` and fill out the necessary fields.~~

The bot currently is designed for Heroku so add environment variables according to the contents of `config_example.json`.

# Running
If you're running the bot locally, to start the bot, run:
```
pm2 start app.js --attach
```
OR
```
npm start
```
