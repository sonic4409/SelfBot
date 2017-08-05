const Discord = require("discord.js");

const client = new Discord.Client();
// client.config = require("./config.json");
client.info = require("./package.json");

console.log(`Starting SelfBot... (v${client.info.version})\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

const Raven = require("raven");
Raven.config(process.env.ravenDSN).install();

const sql = require("sqlite");
sql.open("./db/deletedMessages.sqlite");

const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require("./modules/functions.js")(client);

(async function() {
  //Load commands into memory from "./commands"
  const commandFiles = await readdir("./commands");
  console.log(`Loading ${commandFiles.length} files!`);
  commandFiles.forEach(file => {
    try {
      const props = require(`./commands/${file}`);
      console.log(`Loading Command: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (err) {
      console.log(`Unable to load command ${file}: \n${err}`);
    }
  });

  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    try {
      const eventName = file.split(".")[0];
      const event = require(`./events/${file}`);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    } catch (err) {
      console.log(`Unable to load event ${file}: \n${err}.`);
    }
  });
  
	client.once("message", msg { // Put this somewhere later
		global.message = msg;
	}
  client.login(process.env.token);
}());
