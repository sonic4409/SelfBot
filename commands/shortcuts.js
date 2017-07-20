const Discord = require("discord.js");
exports.run = async(client, msg) => {
  const embed = await new Discord.RichEmbed()
    .setColor(3447003)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle("Shortcuts List")
    .setDescription("lenny\nshrug\njustright\npedo\nrave\nthefuck");
  msg.edit({ embed });
};

exports.conf = {
  enabled: true,
  aliases: [],
};

exports.help = {
  name: "shortcuts",
  description: "A list of shortcuts you can use",
  usage: "\`shortcuts\`"
};
