exports.run = async(client, msg, args, date) => { // Use ternary operators next time to check string length
  try {
    if (!args.length) return;
    const code = args.join(" ");
    let evaled = await eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 });
    let m = `:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${client.clean(evaled)}\n\`\`\``;
    if (m.length > 2000) {
      m = `:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\nOutput was too long... ${evaled.length} characters!\nOutput uploaded to ${await client.haste(evaled)}\n\`\`\``;
    }

    msg.edit(m);

    console.log(`[${date}] Success!`);
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${args.join(" ")}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${client.clean(err)}\n\`\`\``);
    console.log(`[${date}] Fail...\nERROR:\n${err.stack}`);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "eval",
  description: "Run some code",
  usage: "`eval [code]`"
};
