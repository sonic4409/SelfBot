const Discord = require("discord.js");
const DarkSky = require("dark-sky");
const NodeGeocoder = require("node-geocoder");
const gcOptions = {
  provider: "google",
    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: process.env.googleGEOCODE, // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

exports.run = async (client, msg, args, date) => {
  const forecast = new DarkSky(process.env.darksky);

  const geocoder = NodeGeocoder(gcOptions);
  try {
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
    const icons = new Map([
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
    let cWeatherIcon;
    let dWeatherIcon;
    let hWeatherIcon;
    if (icons.has(response["currently"].icon)) {
      cWeatherIcon = icons.get(response["currently"].icon);
      dWeatherIcon = icons.get(response["daily"].icon);
      hWeatherIcon = icons.get(response["hourly"].icon);
    }

    const embed = await new Discord.RichEmbed()
      .setColor(0x3498DB)
      .setTitle(`Weather for *${response.timezone}*`)
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
  aliases: []
};

exports.help = {
  name: "weather",
  description: "Get the weather of Perth, Australia",
  usage: "\`weather [place]\`"
};
