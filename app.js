const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const math = require("mathjs"); //Set up Calculator
const DarkSky = require("dark-sky");
const forecast = new DarkSky(config.darksky);
const sql = require("sqlite");
sql.open("./db/deletedMessages.sqlite");

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
    commandFile.run(client, msg, date, Discord, args, math, forecast);

  } catch (err) {
    return console.error(err);
  }

});
client.on("messageDelete", msg => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  try {
    sql.run("INSERT INTO deletedMessages (userId, guildId, msgId, msgContent) VALUES (?, ?, ?, ?)", [msg.author.id, msg.guild.id, msg.id, msg.content]);
    console.log(`(${msg.author.id}) in guild: ${msg.guild.id}, deleted a message: ${msg.content}`);
  } catch (err) {
    sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, guildId TEXT, msgId TEXT, msgContent TEXT)");
    console.log("Created Table!");
  }
});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

client.on("ready", () => {
  let dt = new Date();
  let date = dt.toLocaleString();
  console.log(`[${date}] Logged in as ${client.user.username}!`);
  console.log(`[${date}] Currently in ${client.channels.size} channels on ${client.guilds.size} servers!`);
  client.user.setGame(gameMessage);
});

client.login(config.token);

process.on("unhandledRejection", err => console.error(`Uncaught Promise Error: \n${err.stack}`));
