const { get, run } = require("sqlite");
const { RichEmbed } = require("discord.js");
exports.run = async(client, msg, args, date) => {
  try {
    const row = await get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}' ORDER BY ROWID ASC LIMIT 1`);
    if (!row) {
      console.log(`[${date}] ... But could not find the row!`);
      const m = await msg.edit(":warning: Could not find the row! :warning:");
      m.delete(2000);
    } else {
      const embed = new RichEmbed()
        .setColor(0xFF0000)
        .setTitle(":recycle: Most Recent Deleted Message! :recycle:")
        .setFooter(`${msg.guild.members.get(row.userId).user.tag} (${row.userId})`, msg.guild.members.get(row.userId).user.displayAvatarURL)
        .addField("Message:", `"${row.msgContent}"`);
      msg.edit({ embed });
      console.log(`[${date}] Success!`);
    }
  } catch (err) {
    console.log(err);
    run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "undel",
  description: "Gets the most recent message deleted and sends it. It's pretty slow because I'm using sqlite",
  usage: "`undel`"
};
