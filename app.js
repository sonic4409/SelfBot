const { Client, Collection } = require("discord.js");

const client = new Client();

/*

fs.writeFile("./config.json", JSON.stringify({
  token: process.env.token,
  prefix: process.env.prefix,
  locale: process.env.locale,
  ravenDSN: process.env.ravenDSN,
  darksky: process.env.darksky,
  googleCSE: process.env.googleCSE,
  googleAPI: process.env.googleAPI,
  googleGEOCODE: process.env.googleGEOCODE
}));

client.config = require("./config.json");
*/

client.info = require("./package.json");

console.log(`Starting SelfBot... (v${client.info.version})\nNode version: ${process.version}\nDiscord.js version: ${Discord.version}`);

require("raven").config(process.env.ravenDSN).install();

require("sqlite").open("./db/deletedMessages.sqlite");

const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

client.commands = new Collection();
client.aliases = new Collection();

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

  client.login(process.env.token);
}());
