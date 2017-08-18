module.exports = (client) => {
  global.bot = client;
  global.wait = require("util").promisify(setTimeout);
	
  process.on("uncaughtException", (err) => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
  
  client.getFileSize = (filePath) => {
    let size = require("fs").statSync(filePath)["size"];
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "KB", "MB", "GB", "TB"][i];
  };

  client.clean = (text) => {
    if (typeof (text) === "string")
      return text
        .replace(client.token, "Nope")
        .replace(client.user.email, "Nice try")
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
  
  client.mockify = (text) => {
    return text.split("").map((value, index) => index % 2 ? value.toUpperCase() : value.toLowerCase()).join(""); // SOMEBODY ONCE TOLD ME THAT this is better than 20 lines of code
  };
  client.covfefify = (string) => {
    let a;
    let b;
    let c;
    return string = ([, a, b, c] = string.match`(.*?[aeiouy]+(.)).*?([aeiouy])`, a + (b = (a = "bcdfgszkvtgp") [11 - a.search(b)] || b) + c + b + c);
  };
};
