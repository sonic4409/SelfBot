exports.run = (client, msg) => { // I'm too lazy to update this so I'll probably delete this in the future
  msg.edit({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.displayAvatarURL
      },
      title: "Gummi's Selfbot",
      url: "https://github.com/GummiWummiBear/SelfBot/",
      description: "A SelfBot made in Discord.js (don't hit me dad)\nNry you better not ban me."
    }
  });
};

exports.conf = {
  enabled: true,
  aliases: ["about"]
};

exports.help = {
  name: "info",
  description: "Information about the bot.",
  usage: "`info`"
};
