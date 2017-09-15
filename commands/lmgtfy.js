exports.run = (client, msg, args) => {
  const result = client.lmgtfy(args.join(" "));
  msg.edit(client.clean(result));
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
