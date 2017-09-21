const sql = require("sqlite");

module.exports = async(client, msg) => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.attachments.size > 0) return; //Ignore files?

  try {
    await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent, timestamp) VALUES (?, ?, ?, ?)", [msg.author.id, msg.channel.id, msg.content, msg.createdAt]);
    console.log(`(${msg.author.tag}) in ${msg.guild.name} in #${msg.channel.name} deleted a message: "${msg.content}"`);
  } catch (err) {
    console.error(err);
    await sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
    await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
  }
};
