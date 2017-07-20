module.exports = (client) => {
  client.on("disconnect", console.warn);
};
