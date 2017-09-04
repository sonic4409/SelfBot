exports.run = async(client, msg, args) => {
  let result = client.mockify(args.join(" "));
  if (msg.guild.id === "222078108977594368") result = `${result} ${msg.guild.emojis.get("313010878196875265").toString()}`; // Just for the Discord.js server because I don't have Nitro :(
  await msg.edit(client.clean(result));
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "mock",
  description: "tHaT AnNoYiNg sPoNgEbOb mOcKiNg mEmE.",
  usage: "`mock [text]`"
};
