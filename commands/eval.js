exports.run = (client, msg, date, Discord, args) => {
  const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(new RegExp(client.token, "g"), "Nope");
    else return text;   
  };
  try {
    var code = args.join(" "); 
    let evaled = eval(code);
    
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      //var evalString = require("util").inspect(evaled);

    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${clean(evaled)}\n\`\`\``);
    console.log(`[${date}] An eval command was used!`);
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${clean(err)}\n\`\`\``);
    console.log(`[${date}] Eval command failed!\nERROR:\n${err.stack}`);
  }
};
