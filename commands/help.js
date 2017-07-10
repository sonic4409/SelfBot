exports.run = async(client, msg, date, Discord) => {
  const embed = await new Discord.RichEmbed()
    .setColor(0x3498DB)
    .setTitle("SelfBot Commands \(WIP\)")
    .setDescription("**info** - Displays info on the SelfBot\n**shortcuts** - Displays a list of text faces/emojis you can use\n**prune** - Deletes you own messages up to a maximum of 100\n**hug** - Hug someone/something!\n**embed** - Embeds your message\n **colour** - Gives a preview of any Hex/Decimal colour\n**avatar** - Shows your avatar\n**weather** - Shows weather of Perth\n**img** - Google searches an image\n**lewd** - Google images but without SafeSearch owo\n**weather** - Get the weather of Perth\n**mock** - thaT aNnoYiNg spoNgEbOb moCkinG meMe\n**covfefe** - Covfefify a word\n**read** - Marks all channels in the current guild as read, do **read all** to mark all guilds as read\n**undel** - Sends the most recent deleted message in the channel (kinda slow)\n**reload** - Reload any command\n**stats** - View bot stats\n**calc**- Big boy calculator, can also do some unit conversions, do **calc help** for examples\n**eval** - Run code, can also be used as a basic calculator");
  msg.channel.send({embed});
  console.log(`[${date}] Help menu was displayed!`);
};