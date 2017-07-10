exports.run = async(client, msg, date, Discord) => {
  const embed = await new Discord.RichEmbed()
    .setColor(3447003)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle("Shortcuts List")
    .setDescription("lenny\nshrug\njustright\npedo\nrave\nthefuck");
  msg.edit({ embed });
  console.log(`[${date}] Shortcuts menu was displayed!`);
};