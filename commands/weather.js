exports.run = async (client, msg, date, Discord, args, math, forecast) => {
  try {
    const response = await forecast
      .latitude("-31.9505")
      .longitude("115.8605")
      .units("ca") //Celsius
      .language("en") //English
      .get()
      let timezone = response.timezone;
      let currentSummary = response["currently"].summary;
      let dailySummary = response["daily"].summary;
      let hourlySummary = response["hourly"].summary;

      //ICONS BUT IT'S IN A MAP SO IT'S AMAZING
      let icons = new Map([
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
      if (icons.has(response["currently"].icon)) {
        var cWeatherIcon = icons.get(response["currently"].icon);
        var dWeatherIcon = icons.get(response["daily"].icon);
        var hWeatherIcon = icons.get(response["hourly"].icon);
      }

      let humidityPercentage = parseInt(response["currently"].humidity * 100);
      let precipPercentage = parseInt(response["currently"].precipProbability * 100);

      const embed = await new Discord.RichEmbed()
        .setColor(0x3498DB)
        .setTitle(`Weather for *${timezone}*`)
        .addField(`${cWeatherIcon} Current:`, `Summary: ${currentSummary}\nTemperature: ${response["currently"].temperature}°C\nFeels Like: ${response["currently"].apparentTemperature}°C\nChance of Precipitation: ${precipPercentage}%\nHumidity: ${humidityPercentage}%`, true)
        .addField(`${dWeatherIcon} Daily:`, `Summary: ${dailySummary}`, true)
        .addField(`${hWeatherIcon} Hourly:`, `Summary: ${hourlySummary}`, true);
      msg.delete();
      msg.channel.send("", {embed: embed});
      //msg.channel.sendEmbed(richEmbed);
      console.log(`[${date}] Weather command used!`);
    } catch(err) {
      console.log(err);
    };
};
