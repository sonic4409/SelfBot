const Discord = require("discord.js");
exports.run = async(client, msg, args, date) => {
  const colour = args.join(" ");

  if (((colour.indexOf("#") === 0) && colour.length === 7) || (!isNaN(colour) && colour.length <= 8 && colour < 16777215)) {
    const embed = await new Discord.RichEmbed()
      .setColor(colour)
      .setDescription(colour);
    msg.edit({embed});
    console.log(`[${date}] Success!`);
  } else {
    const m = await msg.edit(":warning: **Invalid Parameters!** :warning:");
    m.delete(2000);
    console.log(`[${date}] Fail...`);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["color"]
};

exports.help = {
  name: "colour",
  description: "Preview the colour using its hex/decimal number",
  usage: "`colour [#HEXCOLOUR]` OR `colour [DECIMALCOLOUR]`"
};
