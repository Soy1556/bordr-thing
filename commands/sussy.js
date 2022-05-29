const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sussy')
		.setDescription(':flushed:'),
	async execute(interaction) {
		await  interaction.reply({ content: '[sussy](<http://roblox.com>) :flushed:', ephemeral: true });
	},
};