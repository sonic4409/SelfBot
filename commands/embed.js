const Discord = require("discord.js");
exports.run = async(client, msg, args, date) => {
  const text = args.join(" ");
  const embed = await new Discord.RichEmbed()
    .setColor(3447003)
    .setDescription(text);
  msg.edit({embed});
  console.log(`[${date}] Success!`);
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "embed",
  description: "Embed any text",
  usage: "\`embed [text]\`"
};
