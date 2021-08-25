const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const Dashboard = require('../discord-easy-dashboard');
const { token, baseUrl, port, client_secret } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.db = require('quick.db');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.dashboard = new Dashboard(client, {
    name: 'DashBot',
    description: 'A super cool bot with an online dashboard!',
	serverUrl: 'https://discord.gg/U2VGrkT',
    baseUrl,
    port,
    secret: client_secret,
});
require('./setDashboardSettings')(client.dashboard);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	client.dashboard.registerCommand(command.data.name, command.data.description, `/${command.data.name} ${command.data.options.map(option => option.name).join(' ')}`);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);