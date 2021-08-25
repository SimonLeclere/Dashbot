const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with a custom message set with the dashboard !'),
	async execute(interaction) {
        const client = interaction.client;
        const guild = interaction.guild;

        const msg = client.db.get(`${guild.id}.helloMsg`) || 'Hey !';
		return interaction.reply(msg);
	},
};