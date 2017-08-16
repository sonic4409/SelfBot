exports.run = async(client, msg, args, date) => {
  try {
    let evaled = await eval(args.join(" "));
    
    if (!args) return evaled = "No code was provided to run!";

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

    const m = `:inbox_tray: **INPUT**\`\`\`js\n${args.join(" ")}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${client.clean(evaled)}\n\`\`\``;
    if (m.length > 2000) {
      evaled = `Output was too long... ${evaled.length} characters!`;
      console.log(`[${date}] LONG OUTPUT\n\n${evaled.stack}`);
    }

    msg.edit(m);

    console.log(`[${date}] An eval command was used!`);
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${args.join(" ")}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${client.clean(err)}\n\`\`\``);
    console.log(`[${date}] Eval command failed!\nERROR:\n${err.stack}`);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "eval",
  description: "Run some code",
  usage: "\`eval [code]\`"
};
