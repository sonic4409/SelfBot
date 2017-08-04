const { exec } = require("child_process");
exports.run = async (client, msg, date, args) => {
  exec(args.join(" "), (error, stdout, stderr) {
	  if (error) {
		  const m = await msg.edit("It failed ecks dee");
			m.delete(3000);
		  console.error(`[$date] Fail... \n${error}`);
		} else {
		  msg.edit(`:inbox_tray: **INPUT:**\n\`\`\`xl\n${args.join(" ")}\n\`\`\`:outbox_tray: **OUTPUT:**\n\`\`\`xl\n${client.clean(stdout)}\n\`\`\``);
		}
	}
};

exports.conf = {
  enabled: true,
	aliases: ["run", "e"]
};

exports.help = {
  name: "exec",
	description: "Run code in the terminal",
	usage: "/`exec [code]/`"
};
