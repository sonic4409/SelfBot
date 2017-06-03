const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const info = require("./package.json");
const math = require("mathjs"); //Set up Calculator
const DarkSky = require("dark-sky");
const forecast = new DarkSky(config.darksky);
const sql = require("sqlite");
sql.open("./db/deletedMessages.sqlite");

const gameMessage = "SelfBot";
//Cool Startup Message
console.log(`Starting SelfBot... (v${info.version})\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

client.on("message", msg => {
  //Set the Time
  var dt = new Date();
  var date = dt.toLocaleString();
  let args = msg.content.split(" ").slice(1);

  if(!msg.content.startsWith(config.prefix)) return;

  //Don't run if the command is sent by another user
  if(msg.author !== client.user) return;
  
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
  }

  //COMMAND Handler
  let command = msg.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, date, Discord, args, math, forecast, sql, clean);

  } catch (err) {
    return console.error(err);
  }

});
client.on("messageDelete", msg => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.length === 0) return;
  sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, guildId TEXT, channelId TEXT, msgId TEXT, msgContent TEXT)"); //Create Table for Deleted Messages
  sql.run("INSERT INTO deletedMessages (userId, guildId, channelId, msgId, msgContent) VALUES (?, ?, ?, ?, ?)", [msg.author.id, msg.guild.id, msg.channel.id, msg.id, msg.content]);
  // GET VALUES FOR USER ID, USER TAG, USER AVATAR URL, CHANNEL ID, MSG CONTENT SOONTM
});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
  console.log(`Currently in ${client.channels.size} channels on ${client.guilds.size} servers!`);
  client.user.setGame(gameMessage);
});

client.login(config.token);

process.on("unhandledRejection", err => console.error(`Uncaught Promise Error: \n${err.stack}`));
