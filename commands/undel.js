exports.run = (client, msg, date, Discord, args, math, forecast, sql) => {
  sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}' ORDER BY ROWID ASC LIMIT 1`).then(row => {
    if (!row) {
      msg.edit(":warning: Could not find the row! :warning:").then(m => m.delete(2000));
      console.log(`[${date}] Could not find the row!`);
    } else {
      msg.delete();
      const embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(":recycle: Most Recent Deleted Message! :recycle:")
        .setFooter(`<@${row.userId.tag}> (${row.userId})`, row.userId.displayAvatarURL)
        .addField("Message:", `"${row.msgContent}"`);
      msg.channel.send({embed: embed}).catch(err => console.log(err));
      //msg.channel.send(`**(${row.userId}) Deleted Message**\n"${row.msgContent}"`);
      console.log(`[${date}] Undel command was used!`);
    }
  }).catch((err) => {
    console.log(err);
  });
};
