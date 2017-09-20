exports.run = (client, msg, args) => {
  msg.edit(client.clean(client.lmgtfy(args.join(" "))));
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "lmgtfy",
  description: "Google it.",
  usage: "`lmgtfy [query]`"
};
