const sql = require("sqlite");
const { RichEmbed } = require("discord.js");

exports.run = async(client, msg, args, date) => {
  try {
    const row = await sql.get(`SELECT * FROM deletedMessages WHERE channelId ='${msg.channel.id}' ORDER BY ROWID ASC LIMIT 1`);
    if (!row) {
      console.log(`[${date}] ... But could not find the row!`);
      const m = await msg.edit(":warning: Could not find the row! :warning:");
      m.delete(3000);
    } else {
      msg.edit(new RichEmbed()
        .setColor(0xFF0000)
        .setTitle(":recycle: Most Recent Deleted Message! :recycle:")
        .setFooter(`${msg.guild.members.get(row.userId).user.tag} (${row.userId})`, msg.guild.members.get(row.userId).user.displayAvatarURL)
        .addField("Message:", `"${row.msgContent}"`)
      );
      console.log(`[${date}] Success!`);
    }
  } catch (err) {
    const m = await msg.edit("Rip fail... The dude probably left the server...");
    m.delete(3000);
    console.log(err);
    sql.run("CREATE TABLE IF NOT EXISTS deletedMessages (userId TEXT, channelId TEXT, msgContent TEXT)");
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "undel",
  description: "Gets the most recent message deleted and sends it. It theoretically works, but doesn't in actual practice",
  usage: "`undel`"
};
