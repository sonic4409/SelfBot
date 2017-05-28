exports.run = (client, msg, date, Discord, args, math, forecast, sql) => {
  sql.open("../db/deletedMessages.sqlite");
  sql.get(`SELECT * FROM deletedMessages WHERE userId ='${msg.author.id}' AND guildId ='${msg.guild.id}' AND channelId ='${msg.channel.id}' ORDER BY ROWID ASC LIMIT 1`).then(row => {
    msg.channel.send(`**(${row.userId}) Deleted Message**\n"${row.msgContent}"`);
  }).catch((err) => {
    console.log(err);
  });
};
