const { RichEmbed } = require("discord.js");

exports.run = (client, msg, args, date) => {
  msg.edit(new RichEmbed()
    .setColor(3447003)
    .setDescription(args.join(" "))
  );
  console.log(`[${date}] Success!`);
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "embed",
  description: "Embed any text",
  usage: "`embed [text]`"
};
