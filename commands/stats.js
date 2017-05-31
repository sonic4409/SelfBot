exports.run = (client, msg, date, Discord) => {
  const embed = new Discord.RichEmbed()
    .setColor(0x7CFC00)
    .setTitle("Stats:")
    .addField("Memory", `${process.memoryUsage().heapUsed/1000000)}MB`, true)
    .addField("Uptime", `≈ ${Math.round(process.uptime()/60)} minutes`, true);
  msg.delete();
  msg.channel.send({embed: embed});
}
//process.memoryUsage().heapUsed/1000000)
