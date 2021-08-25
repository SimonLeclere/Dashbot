const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const pingCmdEnabled = interaction.client.db.get(`${interaction.guild.id}.enablePing`);
		if(pingCmdEnabled) return interaction.reply('Pong!');
		return interaction.reply('This command is disabled');
	},
};