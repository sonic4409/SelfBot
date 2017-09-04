module.exports = async(client) => {
  console.log(`Logged in as ${client.user.username}!`);
  await wait(5000); // eslint-disable-line no-undef
  console.log(`Serving ${client.users.size} users!`);
};
