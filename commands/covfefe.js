const { RichEmbed } = require("discord.js");

exports.run = (client, msg, args, date) => {
  msg.edit(new RichEmbed()
    .setTitle("Covfefify a Word!")
    .setColor(3447003)
    .setDescription(`${args[0]} => ${client.covfefify(args[0])}`)
  );
  console.log(`[${date}] Success!`);
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "covfefe",
  description: "Covfefifies a word!",
  usage: "`covfefe [word]`"
};
