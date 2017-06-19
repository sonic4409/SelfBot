exports.run = (client, msg, date, Discord, args) => {
  const config = require("../config.json");
  const GoogleImages = require("google-images");
  const gClient = new GoogleImages(config.googleCSE, config.googleAPI);

  let search = args.join(" ");

  if (search.length > 0) {
    try {
      gClient.search(search, {safe: "off"})
        .then (response => {
          let image = response[0].url;
          const embed = new Discord.RichEmbed()
            .setColor(0x3498DB)
            .setTitle(`NSFW Image Result For: **${search}**`)
            .setDescription(image)
            .setImage(image);
          msg.delete();
          msg.channel.send("", {embed});
          console.log(`[${date}] Searched for '${search}'`);
        });
    } catch (err) {
      msg.edit(`[${date}] Something went terribly wrong...`).then(m => m.delete(2000));
      console.error(err);
    }
  } else {
    msg.edit(":warning: Invalid Parameters!") .then(m => m.delete(2000));
    console.log(`[${date}] NSFW search command failed due to invalid parameters!`);
  }
};
