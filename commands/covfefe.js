exports.run = async(client, msg, date, Discord, args) => {
  let a = undefined;
  let b = undefined;
  let c = undefined;
  const covfefify = string => ([undefined, a, b, c] = string.match`(.*?[aeiouy]+(.)).*?([aeiouy])`, a + (b = (a = "bcdfgszkvtgp") [11 - a.search(b)] || b) + c + b + c);
  const embed = await new Discord.RichEmbed()
    .setTitle("Covfefify a Word!")
    .setColor(3447003)
    .setDescription(`${args[0]} => ${covfefify(args[0])}`);
  msg.edit({embed});
  console.log(`[${date}] A word was Covfefified!`);
};
