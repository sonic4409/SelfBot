exports.run = (client, msg, date, Discord, args) => {
  let covfefify = s=>([,a,b,c]=s.match`(.*?[aeiouy]+(.)).*?([aeiouy])`,a+(b=(a="bcdfgszkvtgp")[11-a.search(b)]||b)+c+b+c)
  const embed = new Discord.RichEmbed()
    .setTitle("Covfefify a String!")
    .setDescription(covfefify(args[0]));
  msg.channel.send({embed: embed});
  console.log(`[${date}] A string was Covfefified!`);
}
