exports.run = (client, msg, date, Discord, args) => {
  //const images =
  let target = args[0];
  if (target.length > 2) {
    msg.edit(`:heart: ${client.user.username} hugs ${target}! :heart:`);
    console.log(`[${date}] Hug command was used successfully!`);
  } else {
    msg.edit(":warning: Target name must be 3 characters or longer!") .then(m => m.delete(1000));
    console.log(`[${date}] Hug command was used improperly!`);
  }
};
