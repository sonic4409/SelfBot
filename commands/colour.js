exports.run = (client, msg, utcDate, args, richEmbed) => {
  var colour = args.join(" ");
  var isNum = /^\d+$/.test(colour);

  if(((colour.indexOf("#") === 0) && colour.length === 7) || (isNum && colour.length <= 8 && colour <= 16777215)) {
    msg.delete();
    richEmbed.setColor(colour);
    richEmbed.setDescription(colour);
    msg.channel.send("", {embed: richEmbed});
    console.log(`[${utcDate}] Colour ${colour} was displayed successfully!`);
  } else {
    msg.edit(":warning: **Invalid Parameters!**");
    setTimeout(() => {
      msg.delete();
    }, 2000);
    console.log(`[${utcDate}] The colour ${colour} failed to be displayed...`);
  }
};
