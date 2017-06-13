const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const info = require("./package.json");
const math = require("mathjs"); //Set up Calculator
const DarkSky = require("dark-sky");
const forecast = new DarkSky(config.darksky);
const sql = require("sqlite");
sql.open("./db/deletedMessages.sqlite");

//Cool Startup Message
console.log(`Starting SelfBot... (v${info.version})\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

function escaped(text) {
  return text.replace(/[.*+?^${}()<>|:[\]\\]/g, "\\$&"); // $& means the whole matched string
}

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
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, date, Discord, args, math, forecast, sql);

  } catch (err) {
    return console.error(err);
  }

});
client.on("messageDelete", msg => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.length === 0) return;
  
  sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}'`).then(row => {
    if(!row) {
      sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, escaped(msg.content)]);
      console.log("Could not find the row, so created a new one for the channel!");
    } else {
      sql.run(`UPDATE deletedMessages SET userId = ${msg.author.id} AND msgContent = ${escaped(msg.content)} WHERE channelId = ${msg.channel.id}`);
      console.log("Updated the row!");
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)").then(() => {
      sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, escaped(msg.content)]);
      console.log("Created Table!");
    }); //Create Table for Deleted Messages
  });
});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.login(config.token);

process.on("unhandledRejection", err => console.error(`Uncaught Promise Error: \n${err.stack}`));
