exports.run = (client, msg, date, Discord, args, math, forecast, sql) => {
  sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}'`).then(row => {
    if (!row) {
      msg.channel.send("Could not find the row!");
      console.log(`[${date}] Could not find the row!`);
    } else {
      msg.delete();
      const embed = new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle(":recycle: Most Recent Deleted Message! :recycle:")
        .setFooter(`Author: ${row.userId}`)
        .addField("Message:", `"${row.msgContent}"`);
      msg.channel.send({embed: embed});
      //msg.channel.send(`**(${row.userId}) Deleted Message**\n"${row.msgContent}"`);
      console.log(`[${date}] Undel command was used!`);
    }
  }).catch((err) => {
    console.log(err);
  });
};
