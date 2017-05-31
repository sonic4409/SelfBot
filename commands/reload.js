exports.run = (client, msg, Discord, args) => {
  if(!args || args.size < 1) return msg.edit('Must provide a command name to reload.').then(m => m.delete(2000));
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  msg.edit(`The command ${args[0]} has been reloaded`).then(m => m.delete(3000));
};
