const { exec } = require("child_process");
exports.run = (client, msg, args, date) => {
	exec(args.join(" "), async(error, stdout, stderr) => {
		if (error) {
			const m = await msg.edit(`It failed ecks dee:\n${stderr}`);
			m.delete(5000);
			console.error(`[${date}] Fail... \n${error}`);
		}
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
