exports.run = async(client, msg, args, date) => {
  if (!args || args.size < 1) {
    console.log(`[${date}] ... But no command was provided to reload!`);
    const m = await msg.edit("You must provide a command to reload!");
    m.delete(2000);
    return undefined;
  }

  let command;
  if (client.commands.has(args[0])) {
    command = client.commands.get(args[0]);
  } else if (client.aliases.has(args[0])) {
    command = client.commands.get(client.aliases.get(args[0]));
  }
  if (!command) {
    const m = await msg.edit(`The command \`${args[0]}\` doesn't seem to exist, nor is it an alias.`);
    m.delete(2000);
    return undefined;
  }
  command = command.help.name;

  delete require.cache[require.resolve(`./${command}.js`)];
  const cmd = require(`./${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });

  console.log(`[${date}] Success!`);
  const m = await msg.edit(`The \`${command}\` command has been reloaded`);
  m.delete(2000);
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "reload",
  description: "Reloads a command that's been modified.",
  usage: "`reload [command]`"
};
