module.exports = async(client, msg) => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.attachments.size > 0) return; //Ignore files?

  try {
    client.deletedMessages.set(msg.channel.id, {
      msgContent: msg.content,
      userID: msg.author.id,
      timestamp: msg.createdAt
    });
    console.log(`(${msg.author.tag}) in ${msg.guild.name} in #${msg.channel.name} deleted a message: "${msg.content}"`);
  } catch (err) {
    console.error(err);
  }
};
