exports.run = async(client, msg, date, Discord, args) => {
  var text = args.join(" ");
  const embed = await new Discord.RichEmbed()
    .setColor(3447003)
    .setDescription(text);
  msg.edit({embed});
  console.log(`[${date}] Embed command was used!`);
};