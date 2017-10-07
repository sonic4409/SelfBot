const { RichEmbed } = require("discord.js");

exports.run = async(client, msg, args, date) => {
  try {
    const channel = client.channels.get(process.env.deletedMessagesChannel);
    if (!channel) {
      console.log(`[${date}] ... No channel was provided in the config to send the message to, aborting...`);
      const m = await msg.edit(":warning: You didn't supply a channel id to send the deleted message to! :warning:");
      m.delete(3000);
    }
    const entry = client.deletedMessages.get(msg.channel.id);
    if (!entry) {
      console.log(`[${date}] ... But could not find the entry!`);
      const m = await msg.edit(":warning: Couldn't find the message! :warning:");
      m.delete(3000);
    } else {
      const u = client.users.get(entry.userID);
      msg.delete();
      channel.send(new RichEmbed()
        .setColor(0xFF0000)
        .setTitle(`:recycle: Most Recent Deleted Message in Guild __${msg.guild.name}__ in __#${msg.channel.name}__! :recycle:`)
        .setFooter(`${String(u.tag)} (${entry.userID})`, String(u.displayAvatarURL))
        .setTimestamp(entry.timestamp)
        .addField("Message:", entry.msgContent)
      );
      console.log(`[${date}] Success!`);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "undel",
  description: "Gets the most recent message deleted and sends it.",
  usage: "`undel`"
};
