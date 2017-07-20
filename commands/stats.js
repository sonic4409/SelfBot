const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");
exports.run = async (client, msg) => {
  const embed = await new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setTitle("Bot Stats:")
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setURL("https://github.com/GummiWummiBear/SelfBot/")
    .setFooter(`Node version: ${process.version} | Discord.js version: ${Discord.version}`, client.user.displayAvatarURL)
    .setTimestamp()
    .addField("Memory", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
    .addField("Uptime", moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]"), true);
  msg.edit({embed});
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "stats",
  description: "Views bot stats.",
  usage: "\`stats\`"
};
