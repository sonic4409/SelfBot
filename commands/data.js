exports.run = (client, msg, date, Discord, args) => {
  const fs = require("fs"); //Load the filesystem module
  const stats = fs.statSync("./../db/deletedMessages.sql");
  const fileSizeInBytes = stats.size;
  //Convert the file size to megabytes (optional)
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  msg.channel.send({embed: {
  color: 3447003,
  description: `Current filesize of sqlite file is ${fileSizeInMegabytes}MB`
  }});
  console.log(`[${date}] File size of deletedMessages.sqlite was viewed!`);
}
