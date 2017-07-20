exports.run = async(client, msg) => {
  const m = await msg.channel.send("HA!!! I CHALLENGE YOU TO READ THIS MESSAGE FAST ENOUGH!!! TOO SLOW!!!");
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. Heartbeat Ping is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  aliases: ["hello", "hello?"]
};

exports.help = {
  name: "ping",
  description: "You ping and the bot pongs.",
  usage: "\`ping\`"
};
