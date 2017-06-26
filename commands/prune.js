exports.run = async (client, msg, date, Discord, args) => {
  let messagecount = parseInt(args[0]);
  var isNum = /^\d+$/.test(messagecount);

  if (messagecount <= 100 && isNum) {
    // get the channel logs
    let messages = await msg.channel.fetchMessages({
      limit: 100
    });

    let msg_array = messages.array();
    // filter the message to only your own
    msg_array = msg_array.filter(m => m.author.id === client.user.id);
    // limit to the requested number + 1 for the command message
    msg_array.length = messagecount + 1;
    // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
    msg_array.map(m => m.delete()/*.catch(console.error)*/);

    console.log(`[${date}] ${messagecount} messages were pruned!`);
  } else {
    let m = await msg.edit(":warning: **Invalid Parameters!**");
    m.delete(2000);
    console.log(`[${date}] Prune command failed due to invalid parameters!`);
  }
};
