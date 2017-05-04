exports.run = (client, msg, date, args, richEmbed) => {
  const config = require("../config.json");
  const GoogleImages = require("google-images");
  const gClient = new GoogleImages(config.googleCSE, config.googleAPI);

  let search = args.join(" ");

  if (search.length > 0) {
    try {
      gClient.search(search)
        .then (response => {
          let image = response[0].url;
          richEmbed.setColor(0x3498DB);
          richEmbed.setTitle(`Image result for: **${search}**`);
          richEmbed.setDescription(image);
          richEmbed.setImage(image);
          msg.delete();
          msg.channel.send("", {embed: richEmbed});
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
