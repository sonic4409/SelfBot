const { RichEmbed } = require("discord.js");
exports.run = (client, msg) => {
  const embed = new RichEmbed()
    .setColor(3447003)
    .setAuthor("GummiWummiBear#4205", "https://avatars0.githubusercontent.com/u/19729435")
    .setTitle("Gummi's SelfBot")
    .setURL("httpsL://github.com/GummiWummiBear/SelfBot")
    .setDescription("A SelfBot made in Discord.js. Made for educational purposes.");
  msg.edit({ embed });
};

exports.conf = {
  enabled: true,
  aliases: ["about"]
};

exports.help = {
  name: "info",
  description: "Information about the bot.",
  usage: "`info`"
};
