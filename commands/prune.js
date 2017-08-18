exports.run = async(client, msg, args, date) => {
  const messagecount = parseInt(args[0]);

  if (messagecount <= 100 && !isNaN(messagecount)) {
    // get the channel logs
    const messages = await msg.channel.fetchMessages({
      limit: 100
    });

    let msg_array = messages.array();
    // filter the message to only your own
    msg_array = msg_array.filter(m => m.author.id === client.user.id);
    // limit to the requested number + 1 for the command message
    msg_array.length = messagecount + 1;
    msg_array.map(m => m.delete() /*.catch(console.error)*/ );

    console.log(`[${date}] Success! ${messagecount} messages were pruned!`);
  } else {
    console.log(`[${date}] ... But invalid parameters were provided!`);
    const m = await msg.edit(":warning: **Invalid Parameters!** :warning:");
    m.delete(2000);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "prune",
  description: "Prunes up to 100 of your own messages.",
  usage: "`prune [number]`"
};
