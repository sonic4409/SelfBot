exports.run = (client, msg, date) => {
  msg.delete();
  msg.channel.sendEmbed({
    color: 3447003,
    author: {
      name: `The time is ${date}`,
      icon_url: client.user.avatarURL
    }});
  console.log(`[${date}]` + " What's the time, Mr. Wolf?");
};
