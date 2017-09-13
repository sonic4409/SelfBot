const { RichEmbed } = require("discord.js");
const GoogleImages = require("google-images");

exports.run = async(client, msg, args, date) => {
  const gClient = new GoogleImages(process.env.googleCSE, process.env.googleAPI);
  const search = args.join(" ");

  if (search.length > 0) {
    try {
      const response = await gClient.search(search);
      if (!response) {
        console.log(`[${date}] ... but nothing was found!`);
        const m = await msg.edit("Nothing Found!");
        m.delete(2000);
      } else {
        const embed = new RichEmbed()
          .setColor(0x3498DB)
          .setTitle(`Image Result For: **${search}**`)
          .setDescription(response[0].url)
          .setImage(response[0].url);
        msg.edit({ embed });
        console.log(`[${date}] Success!`);
      }

    } catch (err) {
      console.log(`Fail... Error:\n${err}`);
      const m = await msg.edit("Something went terribly wrong... It's probably not your fault...");
      m.delete(2000);
    }
  } else {
    console.log(`[${date}] ... but there was nothing provided to search for!`);
    const m = await msg.edit(":warning: Invalid Parameters! :warning:");
    m.delete(2000);
  }
};

exports.conf = {
  enabled: true,
  aliases: []
};

exports.help = {
  name: "img",
  description: "Google Search for an image",
  usage: "`img [query]`"
};
