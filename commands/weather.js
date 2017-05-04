exports.run = (client, msg, date, args, richEmbed, math, forecast, Discord) => {
  forecast
    .latitude("-32.016426")
    .longitude("115.8687878")
    .units("ca") //Celsius
    .language("en") //English
    .get()
    .then(response => {
      //console.log(response);
      let c = "currently";
      let d = "daily";
      let h = "hourly";
      //let lat = response.latitude;
      //let long = response.longitude;
      let timezone = response.timezone;
      let currentSummary = response[c].summary;
      let dailySummary = response[d].summary;
      let hourlySummary = response[h].summary;

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
      if (icons.has(response[c].icon)) {
        var cWeatherIcon = icons.get(response[c].icon);
        var dWeatherIcon = icons.get(response[d].icon);
        var hWeatherIcon = icons.get(response[h].icon);
      }

      let humidity = parseInt(response[c].humidity);
      let humidityPercentage = parseInt(humidity * 100);
      let precip = parseInt(response[c].precipProbability);
      let precipPercentage = parseInt(precip * 100);

      const embed = new Discord.RichEmbed()
        .setColor(0x3498DB)
        .setTitle(`Weather for *${timezone}*`)
        .addField(`${cWeatherIcon} Current:`, `Summary: ${currentSummary}\nTemperature: ${response[c].temperature}°C\nFeels Like: ${response[c].apparentTemperature}°C\nChance of Precipitation: ${precipPercentage}%\nHumidity: ${humidityPercentage}%`, true)
        .addField(`${dWeatherIcon} Daily:`, `Summary: ${dailySummary}`, true)
        .addField(`${hWeatherIcon} Hourly:`, `Summary: ${hourlySummary}`, true);
      msg.delete();
      msg.channel.send("", {embed: embed});
      //msg.channel.sendEmbed(richEmbed);
      console.log(`[${date}] Weather command used!`);
    })
    .catch(err => {
      console.log(err);
    });
};
