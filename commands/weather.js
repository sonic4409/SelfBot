const { RichEmbed } = require("discord.js");
const DarkSky = require("dark-sky");
const NodeGeocoder = require("node-geocoder");

exports.run = async(client, msg, args, date) => {
  const geocoder = NodeGeocoder({
    provider: "google",
    httpAdapter: "https",
    apiKey: process.env.googleGEOCODE,
    formatter: null
  });

  const forecast = new DarkSky(process.env.darksky);

  try {
    if (!args.length) {
      const m = await msg.edit("You did not provide a location!");
      m.delete(3000);
      return undefined;
    }
    const location = await geocoder.geocode(args.join(" "));
    if (!location) {
      const m = await msg.edit("Couldn't find that place!");
      m.delete(3000);
      return undefined;
    }

    const response = await forecast
      .latitude(location[0].latitude)
      .longitude(location[0].longitude)
      .units("ca") //Celsius
      .language("en") //English
      .get();

    //Get the Icons
    const cWeatherIcon = client.weatherIcons.get(response["currently"].icon);
    const dWeatherIcon = client.weatherIcons.get(response["daily"].icon);
    const hWeatherIcon = client.weatherIcons.get(response["hourly"].icon);

    msg.edit(new RichEmbed()
      .setColor(0x3498DB)
      .setTitle(`Weather for *${location[0].formattedAddress}*`)
      .addField(`${cWeatherIcon} Current:`, `Summary: ${response["currently"].summary}\nTemperature: ${response["currently"].temperature}°C\nFeels Like: ${response["currently"].apparentTemperature}°C\nChance of Precipitation: ${response["currently"].precipProbability * 100}%\nHumidity: ${response["currently"].humidity * 100}%`, true)
      .addField(`${dWeatherIcon} Daily:`, `Summary: ${response["daily"].summary}`, true)
      .addField(`${hWeatherIcon} Hourly:`, `Summary: ${response["hourly"].summary}`, true)
    );
    console.log(`[${date}] Success!`);
  } catch (err) {
    console.log(`Failed... Error:\n${err}`);
  }
};

exports.conf = {
  enabled: true,
  aliases: ["forecast"]
};

exports.help = {
  name: "weather",
  description: "Get the weather of a city anywhere on Earth.",
  usage: "`weather [place]`"
};
