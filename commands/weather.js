const Discord = require("discord.js");
const DarkSky = require("dark-sky");
const NodeGeocoder = require("node-geocoder");

exports.run = async (client, msg, args, date) => {
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
      m.delete(2000);
      return;
    }
    const location = await geocoder.geocode(args.join(" "));
    if (!location) {
      const m = await msg.edit("Couldn't find that place!");
      m.delete(2000);
      return;
    }

    const response = await forecast
      .latitude(location[0].latitude)
      .longitude(location[0].longitude)
      .units("ca") //Celsius
      .language("en") //English
      .get();

    //ICONS BUT IT'S IN A MAP SO IT'S AMAZING
    const icons = new Map([ // Someone help me this was a bad idea
      ["clear-day", ":white_sun_small_cloud: :white_sun_small_cloud:"],
      ["clear-night", ":milky_way: :milky_way:"],
      ["rain", ":cloud_rain: :cloud_rain:"],
      ["snow", ":cloud_snow: :cloud_snow:"],
      ["sleet", ":cloud_rain: :cloud_snow:"],
      ["wind", ":wind_blowing_face: :wind_blowing_face:"],
      ["fog", ":foggy: :foggy:"],
      ["cloudy", ":cloud: :cloud:"],
      ["partly-cloudy-day", ":white_sun_cloud: :white_sun_cloud:"],
      ["partly-cloudy-night", ":white_sun_cloud: :milky_way:"],
      ["thunderstorm", ":thunder_cloud_rain: :thunder_cloud_rain:"]
    ]);

    //Get the Icons
    const cWeatherIcon = icons.get(response["currently"].icon);
    const dWeatherIcon = icons.get(response["daily"].icon);
    const hWeatherIcon = icons.get(response["hourly"].icon);
    
    const embed = await new Discord.RichEmbed()
      .setColor(0x3498DB)
      .setTitle(`Weather for *${location[0].formattedAddress}*`)
      .addField(`${cWeatherIcon} Current:`, `Summary: ${response["currently"].summary}\nTemperature: ${response["currently"].temperature}°C\nFeels Like: ${response["currently"].apparentTemperature}°C\nChance of Precipitation: ${response["currently"].precipProbability * 100}%\nHumidity: ${response["currently"].humidity * 100}%`, true)
      .addField(`${dWeatherIcon} Daily:`, `Summary: ${response["daily"].summary}`, true)
      .addField(`${hWeatherIcon} Hourly:`, `Summary: ${response["hourly"].summary}`, true);
    msg.edit({embed});
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
