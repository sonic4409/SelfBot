exports.run = async(client, msg, date, Discord, args) => {
  var colour = args.join(" ");

  if (((colour.indexOf("#") === 0) && colour.length === 7) || (!isNaN(colour) && colour.length <= 8 && colour <= 16777215)) {
    msg.delete();
    const embed = await new Discord.RichEmbed()
      .setColor(colour)
      .setDescription(colour);
    msg.channel.send({embed});
    console.log(`[${date}] Colour ${colour} was displayed successfully!`);
  } else {
    let m = await msg.edit(":warning: **Invalid Parameters!** :warning:");
    m.delete(2000);
    console.log(`[${date}] The colour ${colour} failed to be displayed...`);
  }
};