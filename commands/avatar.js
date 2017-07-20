const Discord = require("discord.js");
exports.run = async(client, msg) => {
  const url = msg.author.displayAvatarURL;
  const embed = await new Discord.RichEmbed()
    .setColor(0x3498DB)
    .setImage(url)
    .setDescription(`${msg.author.username}'s Avatar, looks sexy amrite?`);
  msg.edit({embed});
};

exports.conf = {
  enabled: true,
  aliases: ["pfp"]
};

exports.help = {
  name: "avatar",
  description: "Show your own avatar for some reason",
  usage: "\`avatar\`"
};
