exports.run = (client, msg, date, Discord, args) => {
  const config = require("../config.json");
  const GoogleImages = require("google-images");
  const gClient = new GoogleImages(config.googleCSE, config.googleAPI);

  let search = args.join(" ");

  if (search.length > 0) {
    try {
      gClient.search(search)
        .then (response => {
          let image = response[0].url;
          const embed = new Discord.RichEmbed()
            .setColor(0x3498DB)
            .setTitle(`Image result for: **${search}**`)
            .setDescription(image)
            .setImage(image);
          msg.delete();
          msg.channel.send("", {embed});
          console.log(`[${date}] Searched for '${search}'`);
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    msg.edit(":warning: Invalid Parameters!") .then(m => m.delete(1000));
    console.log(`[${date}] Search command failed due to invalid parameters!`);
  }
};
