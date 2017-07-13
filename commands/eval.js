exports.run = async(client, msg, date, Discord, args, math, forecast, sql, moment) => {
  const clean = text => {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(client.token, "Nope").replace(client.user.email, "fake@email.com");
    else return text;
  };
  try {
    var code = args.join(" ");
    let evaled = await eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

    if (evaled.length > 2000) {
      evaled = `Output was too long... ${evaled.length} characters!`;
      console.log(`[${date}] LONG OUTPUT\n\n${evaled.stack}`);
    }

    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${clean(evaled)}\n\`\`\``);

    console.log(`[${date}] An eval command was used!`);
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${clean(err)}\n\`\`\``);
    console.log(`[${date}] Eval command failed!\nERROR:\n${err.stack}`);
  }
};
