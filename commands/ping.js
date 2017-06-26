exports.run = async (client, msg, date) => {
  let m = await msg.channel.send("HA!!! I CHALLENGE YOU TO READ THIS MESSAGE FAST ENOUGH!!! TOO SLOW!!!");
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. Heartbeat Ping is ${Math.round(client.ping)}ms`);
  console.log(`[${date}] Ping command was used!`);
};
