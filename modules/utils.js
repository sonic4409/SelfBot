module.exports = (client) => {
  global.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });

  client.clean = (text) => {
    if (typeof(text) === "string")
      return text
        .replace(client.token, "Nope")
        .replace(client.user.email, "Nice try")
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
};
