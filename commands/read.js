exports.run = (client, msg, date, Discord, args) => {
  if (args[0] === "all") {
    client.guilds.forEach(g => g.acknowledge());
    msg.edit("Marked all guilds as read!").then(m => m.delete(2000));
    console.log(`[${date}] Marked all guilds as read!`);
  } else {
    msg.guild.acknowledge();
    msg.edit("Marked all channels in the guild as read!").then(m => m.delete(2000));
    console.log(`[${date}] Marked all channels in the guild as read!`);
  }

};
