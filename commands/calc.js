const { RichEmbed } = require("discord.js");

exports.run = async(client, msg, args, date) => {
  try {
    const text = args.join(" ");
    const result = require("mathjs").eval(text);
    if (text === "help") { // eeeee
      msg.edit("__**Sample Calculator Commands**__\n```js\n1+1 //2\n2^2 //4\nsqrt(25) //5\n5.08 cm to inch //Pretty damn close to 2 inches!\n1in to cm //2.54cm (Abbreviations work aswell!)\nsin(45) //0.8509035245341184 (Default is radians)\nsin(45 deg) //0.7071067811865475 (Degrees can be specified!)\n9 / 3 + 2i //3 + 2i\nlog(3) //1.0986122886681098\n```"); // Fix this pls me
    } else if (args.length) {
      msg.edit(new RichEmbed()
        .setTitle("Calculate")
        .setColor(3447003)
        .addField(":inbox_tray: **INPUT:**", `\`\`\`xl\n${text}\n\`\`\``)
        .addField(":outbox_tray: **RESULT**", `\`\`\`xl\n${result}\n\`\`\``)
      );
    }
    console.log(`[${date}] Success!`);
  } catch (err) {
    const m = await msg.edit("Couldn't math good :(");
    m.delete(2000);
    console.log(`[${date}] Fail... Error:\n${err}`);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "calc",
  description: "A calculator, can also be used for conversions.",
  usage: "`calc [input]`. Do `calc help` for example usage."
};
