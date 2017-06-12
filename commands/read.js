exports.run = (client, msg, date, Discord) => {
  msg.guild.acknowledge();
  console.log(`[${date}] Marked all channels in the guild as read!`);
};
