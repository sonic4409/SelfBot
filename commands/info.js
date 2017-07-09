exports.run = (client, msg, date) => {
  msg.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Gummi's Selfbot",
      //url: "http://google.com",
      description: "A SelfBot made in Discord.js (don't hit me dad)\nNry you better not ban me."
    }
  });
  console.log(`${date} Info was displayed!`);
};