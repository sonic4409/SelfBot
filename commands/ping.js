exports.run = (client, msg, date) => {
  msg.channel.send("HA!!! I CHALLENGE YOU TO READ THIS MESSAGE FAST ENOUGH!!! TOO SLOW!!!").then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`) );
  console.log(`[${date}] Ping command was used!`);
};
