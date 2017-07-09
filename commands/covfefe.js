exports.run = async(client, msg, date, Discord, args) => {
  function covfefify(text) {
    ([, a, b, c] = text.match `(.*?[aeiouy]+(.)).*?([aeiouy])`, a + (b = (a = "bcdfgszkvtgp")[11 - a.search(b)] || b) + c + b + c);
  }
  const embed = await new Discord.RichEmbed()
    .setTitle("Covfefify a String!")
    .setColor(3447003)
    .setDescription(`${args[0]} => ${covfefify(args[0])}`);
  msg.delete();
  msg.channel.send({
    embed: embed
  });
  console.log(`[${date}] A word was Covfefified!`);
};