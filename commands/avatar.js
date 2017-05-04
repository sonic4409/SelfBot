exports.run = (client, msg, date, args, richEmbed) => {
  let url = msg.author.displayAvatarURL;
  richEmbed.setColor(0x3498DB);
  richEmbed.setImage(url);
  richEmbed.setDescription(`${msg.author.username}'s Avatar, looks sexy amrite?`);
  msg.channel.send("", {embed: richEmbed});
  console.log(`[${date}] Your avatar was displayed!`);
};
