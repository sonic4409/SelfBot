exports.run = (client, msg, date, Discord, args) => {
  const mockify = (input) => {
    var out = "";
    var k = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < input.length; i++) {
      if (k == 0) {
        out += input[i].toUpperCase();
        k = Math.floor(Math.random() * 3) + 1;
        continue;
      } else if (k > 0) {
        out += input[i];
        k--;
      }
    }
    return out;
  };
  /*const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  };*/
  msg.edit(mockify(args.join(" ")));
};
