# SelfBot
Discord SelfBot made in Discord.js.

# Setup
Make sure you have Nodejs installed.
To install dependencies, run `npm install`

# Config
To set up your bot, you'll need create a `config.json` file with this inside:
```
{
   "token": "", // Discord Bot Token
   "prefix": "", // Bot Prefix
   "ravenDSN": "", //Sentry.io DSN Link
   "darksky": "", // DarkSky Weather API Key
   "googleCSE": "", // Google Custom Search Engine Key
   "googleAPI": "" // Google API Key
}
```
# Running
To start the bot, run:
```
pm2 start app.js --attach
```
