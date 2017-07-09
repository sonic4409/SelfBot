exports.run = (client, msg, date, Discord, args) => {
  var text = args.join(" ");

  msg.delete();
  msg.channel.send("", {
    embed: {
      color: 3447003,
      description: text
    }
  });
  console.log(`[${date}] Embed command was used!`);
};