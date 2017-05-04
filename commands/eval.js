exports.run = (client, msg, date, args, richEmbed, math, forecast) => { //Import everything for all commands and stuff

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

  try {
    var code = args.join(" ");
    var evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    var cleanEval = clean(evaled);
    if (args.length > 0) {
      msg.delete();
      msg.channel.send(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`xl\n${cleanEval}\n\`\`\``);
      console.log(`[${date}] An eval command was used!`);
    }
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    console.log(`[${date}] Eval command failed!`);
  }
  console.log(`[${date}] An eval command was used!`);
};
