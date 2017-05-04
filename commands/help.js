exports.run = (client, msg, date) => {
  msg.delete();
  msg.channel.sendEmbed({
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "SelfBot Commands",
    description: "**info** - Displays info on the SelfBot\n**shortcuts** - Displays a list of text faces/emojis you can use\n**prune** - Deletes you own messages up to a maximum of 100\n**time** - What's the time, Mr. Wolf?\n**embed** - Embeds your message\n **colour** - Gives a preview of any Hex/Decimal colour\n**avatar** - Shows your avatar\n**eval** - Run code, can also be used as a calculator"
  });
  console.log(`[${date}]` + " Help menu was displayed!");
};
