exports.run = async (client, msg, date, Discord, args) => {
  if (args[0] === "all") {
    client.guilds.forEach(g => g.acknowledge());
    let m = await msg.edit("Marked all guilds as read!");
    m.delete(2000);
    console.log(`[${date}] Marked all guilds as read!`);
  } else {
    msg.guild.acknowledge();
    let m = await msg.edit("Marked all channels in the guild as read!");
    m.delete(2000);
    console.log(`[${date}] Marked all channels in the guild as read!`);
  }

};
