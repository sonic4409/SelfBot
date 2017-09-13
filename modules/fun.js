module.exports = (client) => {
  client.mockify = (text) => {
    return text.split("").map((value, index) => index % 2 ? value.toUpperCase() : value.toLowerCase()).join("");
  }
  
  client.lmgtfy = (search) => {
    return "http://lmgtfy.com/?q=" + search.replace(/ /g, "+");
  }

  client.covfefify = (string) => {
    let a;
    let b;
    let c;
    return string = ([, a, b, c] = string.match`(.*?[aeiouy]+(.)).*?([aeiouy])`, a + (b = (a = "bcdfgszkvtgp") [11 - a.search(b)] || b) + c + b + c);
  };

  client.weatherIcons = new Map([ // So I don't define it every time I use the weather command
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
};
