const { RichEmbed } = require("discord.js");
exports.run = async(client, msg, args, date) => {
  const text = args.join(" ");
  const embed = new RichEmbed()
    .setColor(3447003)
    .setDescription(text);
  msg.edit({ embed });
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "embed",
  description: "Embed any text",
  usage: "`embed [text]`"
};
