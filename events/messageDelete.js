const sql = require("sqlite");

module.exports = async(client, msg) => {
  if (msg.author.bot) return; //Ignores bots' messages
  if (msg.author.id === client.user.id) return; //Ignore own messages
  if (msg.channel.type === "dm") return; //Ignores messages from DMs
  if (msg.length === 0) return; //Ignore embeds and files?

  try {
    const row = await sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}'`);
    if (!row) {
      await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
      console.log("Could not find the row, so created a new one for the channel!");
    } else {
      await sql.run("REPLACE INTO deletedMessages (userId, channelId, msgContent) VALUES(?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
      console.log("Updated the row!");
    }
  } catch (err) {
    console.error;
    await sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
    await sql.run("INSERT INTO deletedMessages (userId, channelId, msgContent) VALUES (?, ?, ?)", [msg.author.id, msg.channel.id, msg.content]);
  }
};
