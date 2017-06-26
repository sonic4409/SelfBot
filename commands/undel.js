exports.run = async (client, msg, date, Discord, args, math, forecast, sql) => {
  sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}' ORDER BY ROWID ASC LIMIT 1`).then(row => {
    if (!row) {
      msg.edit(":warning: Could not find the row! :warning:").then(m => m.delete(2000));
      console.log(`[${date}] Could not find the row!`);
    } else {
      const embed = await new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(":recycle: Most Recent Deleted Message! :recycle:")
        .setFooter(`${msg.guild.members.get(row.userId).user.tag} (${row.userId})`, msg.guild.members.get(row.userId).user.displayAvatarURL)
        .addField("Message:", `"${row.msgContent}"`);
      msg.delete();
      msg.channel.send({embed: embed}).catch(err => console.log(err));
      console.log(`[${date}] Undel command was used!`);
    }
  }).catch((err) => {
    console.log(err);
    sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
  });
};
