exports.run = async(client, msg, args, date) => {
  if (args[0] === "all") {
    await client.guilds.forEach(g => g.acknowledge());
    console.log(`[${date}] Success! Marked all guilds as read!`);
    const m = await msg.edit("Marked all guilds as read!");
    m.delete(2000);
  } else {
    await msg.guild.acknowledge();
    console.log(`[${date}] Success! Marked all channels in the guild as read!`);
    const m = await msg.edit("Marked all channels in the guild as read!");
    m.delete(2000);
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
};

exports.help = {
  name: "read",
  description: "Marks the guild or all guilds as read.",
  usage: "`read` to mark the guild as read OR `read all` to mark ALL guilds as read"
};
