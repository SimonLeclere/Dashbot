const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('Admin-only secret command... Set the authorized role to use it on the dashboard 😉'),
	async execute(interaction) {

        const client = interaction.client;
        const roleID = client.db.get(`${interaction.guild.id}.adminRole`);

        if(!roleID) return interaction.reply('No admin role configured!');

        if(interaction.member.roles.cache.has(roleID)) return interaction.reply('https://c.tenor.com/2T506UHvonMAAAAC/pirate-cat.gif');

        return interaction.reply('You do not have the required role to perform this command!', { ephemeral: true });
	},
};