exports.run = (client, msg, date, args) => {
  //const images =
  let target = args[0];
  if (target.length > 0 && msg.mentions.members.length === 1) {
    msg.edit(`:heart: <@${msg.author.username}> hugs ${target}! :heart:`);
    console.log(`[${date}] Hug command was used successfully!`);
  } else if (msg.mentions.members.length > 1) {
    msg.edit(":warning: Too many arguments! Mentions one user only!");
    console.log(`[${date}] Hug command was used improperly!`);
  } else if (msg.mentions.members.length === 0) {
    msg.edit(":warning: Mention one user!");
    console.log(`[${date}] Hug command was used improperly!`);
  } else {
    msg.edit(":warning: Invalid Parameters!") .then(m => m.delete(1000));
    console.log(`[${date}] Hug command was used improperly!`);
  }
};
