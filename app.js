const Raven = require("raven");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const info = require("./package.json");
const math = require("mathjs"); //Set up Calculator
const DarkSky = require("dark-sky");
const forecast = new DarkSky(config.darksky);
const sql = require("sqlite");
Raven.config(config.ravenDSN).install();
sql.open("./db/deletedMessages.sqlite");

//Cool Startup Message
console.log(`Starting SelfBot... (v${info.version})\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

client.on("message", msg => {
  //Set the Time
  var date = new Date().toLocaleString();
  const args = msg.content.split(" "); // let args = msg.content.split(" ").slice(1);

  if (!msg.content.startsWith(config.prefix)) return;

  //Don't run if the command is sent by another user
  if (msg.author !== client.user) return;

  //COMMAND Handler
  const command = args.shift().slice(config.prefix.length);

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, date, Discord, args, math, forecast, sql);

  } catch (err) {
    return console.error(err); // Do something with tags here
  }

});
client.on("messageDelete", async(msg) => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.length === 0) return;

  try {
    const row = await sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}'`);
    if (!row) {
      await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
      console.log("Could not find the row, so created a new one for the channel!");
    } else {
      await sql.run("REPLACE INTO deletedMessages (userId, channelId, msgContent) VALUES(?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
      console.log("Updated the row!");
    }
  } catch (err) {
    console.error;
    await sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
    await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
    console.log("Created Table!"); //Create Table for Deleted Messages
  }
});

client.on("error", console.error);
client.on("warn", console.warn);
client.on("disconnect", console.warn);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}! Serving ${client.users.size} users!`);
});

client.login(config.token);

process.on("unhandledRejection", console.error);