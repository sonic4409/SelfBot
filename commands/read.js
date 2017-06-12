exports.run = (client, msg, date, Discord) => {
  msg.guild.acknowledge().then(() => msg.edit("Marked all channels in the guild as read!").then(m => m.delete(3000));
  console.log(`[${date}] Marked all channels in the guild as read!`);
};
