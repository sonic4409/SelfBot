# SelfBot
[![Build Status](https://travis-ci.org/GummiWummiBear/SelfBot.svg?branch=master)](https://travis-ci.org/GummiWummiBear/SelfBot)
Discord SelfBot made in Discord.js.

# Setup
Make sure you have Nodejs installed.
To install dependencies, run `npm install`

# Config
To set up your bot, you'll need create a `config.json` file with this inside (of course removing the comments):
```
{
   "token": "", // Discord Bot Token
   "prefix": "", // Bot Prefix
   "locale": "", // Region as found on https://momentjs.com/timezone/. e.g. Australia/Perth
   "ravenDSN": "", //Sentry.io DSN Link (optional)
   "darksky": "", // DarkSky Weather API Key
   "googleCSE": "", // Google Custom Search Engine Key
   "googleAPI": "", // Google API Key
   "googleGEOCODE": "" // Google Geocoder Key
}
```
# Running
To start the bot, run:
```
pm2 start app.js --attach
```
OR
```
npm start
```
