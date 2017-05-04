exports.run = (client, msg, date) => {
  msg.delete();
  msg.channel.sendEmbed({
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Shortcuts List",
    description: "lenny\nshrug\njustright\ntableflip\nunflip\npedo\nrave\nthefuck\nsmirk"
  });
  console.log(`[${date}]`+ " Shortcuts menu was displayed!");
};
