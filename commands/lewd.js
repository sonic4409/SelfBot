exports.run = async (client, msg, date, Discord, args) => {
  const config = require("../config.json");
  const GoogleImages = require("google-images");
  const gClient = new GoogleImages(config.googleCSE, config.googleAPI);

  let search = args.join(" ");

  if (search.length > 0) {
    try {
      const response = await gClient.search(search, {safe: "off"});
      if (!response) {
        let m = await msg.edit("Nothing Found!");
        m.delete(2000);
        return;
      } else {
        let image = response[0].url;
        const embed = await new Discord.RichEmbed()
          .setColor(0x3498DB)
          .setTitle(`NSFW Image Result For: **${search}**`)
          .setDescription(image)
          .setImage(image);
        msg.delete();
        msg.channel.send("", {embed});
        console.log(`[${date}] Searched for '${search}'`);
      }

    } catch (err) {
      let m = await msg.edit("Something went terribly wrong...");
      m.delete(2000);
      console.error(err);
    }
  } else {
    let m = await msg.edit(":warning: Invalid Parameters!");
    m.delete(2000);
    console.log(`[${date}] Search command failed due to invalid parameters!`);
  }
};
