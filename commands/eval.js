exports.run = (client, msg, date, Discord, args, math, forecast, sql, clean) => { //Import everything for all commands and stuff
  try {
    var code = args.join(" "); 
    let evaled = eval(code);

    if (typeof evaled !== "string")
      return evaled = require("util").inspect(evaled);
    
    var cleanEval = clean(evaled.replace(new RegExp(client.token, "g"), "Nope"));
    if (code.length > 0) {
      msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${cleanEval}\n\`\`\``).catch(err => console.log(err));
      console.log(`[${date}] An eval command was used!`);
    }
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${err}\n\`\`\``).catch(err => console.log(err));
    console.log(`[${date}] Eval command failed!\nERROR:\n${err}`);
  }
  consolg.log(`[${date}] Evaled some stuff?`);
};
