exports.run = (client, msg, date, Discord, args) => {
  const fs = require("fs"); //Load the filesystem module
  fs.stat("../db/deletedMessages.sqlite", function(err, stat) {
  if(err) {
    console.log(err);
  }
  console.log(stat.size);    
  });

  msg.channel.send({embed: {
  color: 3447003,
  description: `Current filesize of sqlite file is ${stat.size}...`
  }});
  console.log(`[${date}] File size of deletedMessages.sqlite was viewed!`);
}
