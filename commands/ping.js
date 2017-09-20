exports.run = async(client, msg) => {
  const m = await msg.channel.send("XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. Heartbeat Ping is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  aliases: ["hello", "hello?"]
};

exports.help = {
  name: "ping",
  description: "You ping and the bot pongs.",
  usage: "`ping`"
};
