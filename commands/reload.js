exports.run = async (client, msg, date, Discord, args) => {
  if(!args || args.size < 1) {
    let m = await msg.edit("Must provide a command name to reload.");
    m.delete(2000);
    return;
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  let m = await msg.edit(`The command ${args[0]} has been reloaded`);
  m.delete(3000);
};
