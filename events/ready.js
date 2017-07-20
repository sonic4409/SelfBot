module.exports = async client => {
  console.log(`Logged in as ${client.user.username}!`);
  await wait(5000);
  console.log(`Serving ${client.users.size} users!`);
};
