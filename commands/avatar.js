const { RichEmbed } = require("discord.js");

exports.run = (client, msg) => {
  const url = msg.author.displayAvatarURL;
  msg.edit(new RichEmbed()
    .setColor(0x3498DB)
    .setImage(url)
    .setDescription(`${msg.author.username}'s Avatar, looks sexy amrite?`)
  );
};

exports.conf = {
  enabled: true,
  aliases: ["pfp"]
};

exports.help = {
  name: "avatar",
  description: "Show your own avatar for some reason",
  usage: "`avatar`"
};
