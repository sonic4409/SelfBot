const { RichEmbed } = require("discord.js");

exports.run = (client, msg) => {
  msg.edit(new RichEmbed()
    .setColor(3447003)
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setTitle("Shortcuts List")
    .setDescription("lenny\nshrug\njustright\npedo\nrave\nthefuck") // kill me
  );
};

exports.conf = {
  enabled: true,
  aliases: [],
};

exports.help = {
  name: "shortcuts",
  description: "A list of shortcuts you can use",
  usage: "`shortcuts`"
};
