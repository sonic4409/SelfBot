const { exec } = require("child_process");
exports.run = (client, msg, args, date) => {
	exec(args.join(" "), (error, stdout, stderr) => {
		if (error) console.error(`[${date}] Fail... \n${error}\n${stderr}`);
		msg.edit(`:inbox_tray: **INPUT:**\n\`\`\`xl\n${args.join(" ")}\n\`\`\`:outbox_tray: **OUTPUT:**\n\`\`\`xl\n${client.clean(stdout)}\n\`\`\``);
		console.log(`[${date}] Success!`);
	});
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
