exports.run = async(client, msg, date, Discord) => {
  const embed = await new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setTitle("Stats:")
    .setFooter(`Node version: ${process.version} | Discord.js version: ${Discord.version}`, client.user.displayAvatarURL)
    .setTimestamp()
    .addField("Memory", `${(process.memoryUsage().heapUsed/1000000).toFixed(2)}MB`, true)
    .addField("Uptime", `≈ ${Math.round(process.uptime()/60)} minutes`, true);

  msg.delete();
  msg.channel.send({embed});
  console.log(`[${date}] Bot stats were viewed!`);
};