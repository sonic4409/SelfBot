const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const richEmbed = new Discord.RichEmbed(); // Set up RichEmbed
const math = require("mathjs"); //Set up Calculator
const DarkSky = require("dark-sky");
const forecast = new DarkSky(config.darksky);

//My Token
const token = config.token;

const gameMessage = "SelfBot";
//Cool Startup Message
console.log("Starting SelfBot...\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);

client.on("message", msg => {
  //Set the Time
  var dt = new Date();
  var date = dt.toLocaleString();
  let args = msg.content.split(" ").slice(1);

  if(!msg.content.startsWith(config.prefix)) return;

  //Don't run if the command is sent by another user
  if(msg.author !== client.user) return;

  //COMMAND Handler
  let command = msg.content.split(" ")[0];
  command = command.slice(config.prefix.length);
  // The list of if/else is replaced with those simple 2 lines:

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, date, args, richEmbed, math, forecast, Discord);

  } catch (err) {
    return console.error(err);
  }

});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

client.on("ready", () => {
  var dt = new Date();
  var date = dt.toLocaleString();
  console.log(`[${date}] Logged in as ${client.user.username}!`);
  console.log(`[${date}] Currently in ${client.channels.size} channels on ${client.guilds.size} servers!`);
  client.user.setGame(gameMessage);
});

client.login(token);
