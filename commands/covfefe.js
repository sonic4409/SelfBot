const Discord = require("discord.js");
exports.run = async(client, msg, args, date) => {
  const embed = await new Discord.RichEmbed()
    .setTitle("Covfefify a Word!")
    .setColor(3447003)
    .setDescription(`${args[0]} => ${client.covfefify(args[0])}`);
  msg.edit({embed});
  console.log(`[${date}] Success!`);
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "covfefe",
  description: "Covfefifies a word!",
  usage: "\`covfefe [word]\`"
};
