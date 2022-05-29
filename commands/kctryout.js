const { SlashCommandBuilder , time } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton  } = require('discord.js');
const date = new Date();

const timeString = time(date);
const relative = time(date, 'R');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kctryout')
		.setDescription('Tryout testing command, V1'),
	async execute(interaction) {
        const askembed = new MessageEmbed()
	.setColor('fffb00')
	.setTitle('When should this be hosted?')
	.setDescription('Please select one of the options below. Press the "other" button for a more specific selection ( UNIX EPOCH ).');
    
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: 'first_option',
                },
                {
                    label: 'You can select me too',
                    description: 'This is also a description',
                    value: 'second_option',
                },
            ]),
    );
    const row2 = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('buttonOtherKC')
            .setLabel('OTHER')
            .setStyle('SUCCESS'),
    );
		await interaction.reply({ embeds: [askembed] , content: ` hi ${timeString}`, components: [row, row2] });;
	},
};