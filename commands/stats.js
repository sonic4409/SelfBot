exports.run = async (client, msg, date, Discord, args, math, forecast, sql, moment) => {
  const embed = await new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setTitle("Bot Stats:")
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setURL("https://github.com/GummiWummiBear/SelfBot/")
    .setFooter(`Node version: ${process.version} | Discord.js version: ${Discord.version}`, client.user.displayAvatarURL)
    .setTimestamp()
    .addField("Memory", `${(process.memoryUsage().heapUsed / 1000000).toFixed(2)}MB`, true)
    .addField("Uptime", `${moment.duration(client.uptime).humanize().charAt(0).toUpperCase()}${moment.duration(client.uptime).humanize().slice(1)}`, true);
  await msg.delete();
  await msg.channel.send({embed});
  console.log(`[${date}] Bot stats were viewed!`);
};