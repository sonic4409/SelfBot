exports.run = (client, msg, date, args) => {

  var text = args.join(" ");

  msg.delete();
  msg.channel.sendEmbed ({
    color: 3447003,
    description: text
  });
  console.log(`[${date}]` + " Embed command was used!");
};
