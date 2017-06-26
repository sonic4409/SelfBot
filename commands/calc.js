exports.run = async (client, msg, date, Discord, args, math) => {
  try {
    var text = args.join(" ");
    var result = math.eval(text);
    if (text === "help") {
      msg.edit("__**Sample Calculator Commands**__\n```js\n1+1 //2\n2^2 //4\nsqrt(25) //5\n5.08 cm to inch //Pretty damn close to 2 inches!\n1in to cm //2.54cm (Abbreviations work aswell!)\nsin(45) //0.8509035245341184 (Default is radians)\nsin(45 deg) //0.7071067811865475 (Degrees can be specified!)\n9 / 3 + 2i //3 + 2i\nlog(3) //1.0986122886681098\n```");
      console.log(`[${date} Calculator help was displayed!`);
    }
    else if (args.length > 0) {
      msg.edit(`**CALULATOR**\n:inbox_tray: **INPUT:**\`\`\`xl\n${text}\n\`\`\`\n:outbox_tray: **RESULT**\n\`\`\`xl\n${result}\n\`\`\``);
      console.log(`[${date}] I can math good!`);
    }
  } catch (err) {
    let m = await msg.edit("Couldn't math good :(");
    m.delete(2000);
    console.log(`[${date}] I can't math good...\n${err}`);
  }

};
