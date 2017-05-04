exports.run = (client, msg, date, args) => {
  let messagecount = parseInt(args[0]);
  var isNum = /^\d+$/.test(messagecount);

  if (messagecount <= 100 && isNum) {
    // get the channel logs
    msg.channel.fetchMessages({
      limit: 100
    })
      .then(messages => {
        let msg_array = messages.array();
        // filter the message to only your own
        msg_array = msg_array.filter(m => m.author.id === client.user.id);
        // limit to the requested number + 1 for the command message
        msg_array.length = messagecount + 1;
        // Has to delete messages individually. Cannot use `deleteMessages()` on selfbots.
        msg_array.map(m => m.delete()/*.catch(console.error)*/);
      });
    console.log(`[${date}]` + ` ${messagecount} messages were pruned!`);
  } else {
    msg.edit(":warning: **Invalid Parameters!**");
    setTimeout(() => {
      msg.delete();
    }, 2000);
    console.log(`[${date}] Prune command failed due to invalid parameters!`);
  }
};
