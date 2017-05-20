exports.run = (client, msg, date) => {
  msg.delete();
  msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Shortcuts List",
    description: "lenny\nshrug\njustright\npedo\nrave\nthefuck"
  }});
  console.log(`[${date}] Shortcuts menu was displayed!`);
};
