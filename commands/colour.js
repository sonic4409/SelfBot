exports.run = (client, msg, date, Discord, args) => {
  var colour = args.join(" ");
  var isNum = /^\d+$/.test(colour);

  if(((colour.indexOf("#") === 0) && colour.length === 7) || (isNum && colour.length <= 8 && colour <= 16777215)) {
    msg.delete();
    const embed = new Discord.RichEmbed()
      .setColor(colour)
      .setDescription(colour);
    msg.channel.send("", {embed});
    console.log(`[${date}] Colour ${colour} was displayed successfully!`);
  } else {
    msg.edit(":warning: **Invalid Parameters!** :warning:").then(m => m.delete(2000));
    console.log(`[${date}] The colour ${colour} failed to be displayed...`);
  }
};
