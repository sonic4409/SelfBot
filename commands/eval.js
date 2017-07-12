exports.run = async(client, msg, date, Discord, args, math, forecast, sql, moment) => {
  const clean = text => {
    if (text && text.constructor.name === 'Promise')
      text = await text;
    if (typeof evaled !== 'string')
      text = require('util').inspect(text, {depth: 0});   
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "Nope");
    return text;
  };
  var code = args.join(" ");
  try {
  
    let evaled = eval(code);
    const output = await clean(evaled);
    else if (evaled.length > 2000) {
      evaled = `Output was too long... ${evaled.length} characters!`;
      console.log(`[${date}] A LONGE OUTPUT INCOMING!!!\n\n${evaled.stack}`);
    }

    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${output}\n\`\`\``);

    console.log(`[${date}] An eval command was used!`);
  } catch (err) {
    msg.edit(`:inbox_tray: **INPUT**\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: **OUTPUT**\n\`\`\`js\n${await clean(err)}\n\`\`\``);
    console.log(`[${date}] Eval command failed!\nERROR:\n${err.stack}`);
  }
};
