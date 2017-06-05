exports.run = (client, msg, date) => {
  msg.delete();
  msg.channel.send("", {embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.displayAvatarURL
    },
    title: "SelfBot Commands",
    description: "**info** - Displays info on the SelfBot\n**shortcuts** - Displays a list of text faces/emojis you can use\n**prune** - Deletes you own messages up to a maximum of 100\n**hug** - Hug someone/something!\n**time** - What's the time, Mr. Wolf?\n**embed** - Embeds your message\n **colour** - Gives a preview of any Hex/Decimal colour\n**avatar** - Shows your avatar\n**weather** - Shows weather of Perth\n**img** - Google searches an image\n**calc** - A real calculator!\n**undel** - Sends the most recent deleted message in the channel\n**reload** - Reload any command\n**eval** - Run code, can also be used as a basic calculator"
  }});
  console.log(`[${date}] Help menu was displayed!`);
};
