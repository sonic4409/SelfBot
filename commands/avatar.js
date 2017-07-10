exports.run = async(client, msg, date, Discord) => {
  let url = msg.author.displayAvatarURL;
  const embed = await new Discord.RichEmbed()
    .setColor(0x3498DB)
    .setImage(url)
    .setDescription(`${msg.author.username}'s Avatar, looks sexy amrite?`);
  msg.edit({embed});
  console.log(`[${date}] Your avatar was displayed!`);
};