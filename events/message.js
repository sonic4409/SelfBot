const moment = require("moment"); // Date/time formatting
require("moment-timezone");

module.exports = (client, msg) => {
  //Set the Time
  const date = moment(new Date()).tz(process.env.locale).format("DD/MM/YYYY, HH:mm:ss z");

  if (!msg.content.startsWith(process.env.prefix)) return;

  //Don't run if the command is sent by another user
  if (msg.author !== client.user) return;

  //COMMAND Handler
  const args = msg.content.split(/\s+/g); // Oshit that's a spicy regex
  const command = args.shift().slice(process.env.prefix.length).toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (cmd) {
    console.log(`[${date}] Ran command ${cmd.help.name}`);
    cmd.run(client, msg, args, date);
  }
};
