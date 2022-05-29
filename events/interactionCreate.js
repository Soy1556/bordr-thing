const { Collection, Intents, MessageEmbed  } = require('discord.js');
const { time } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;




module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        const tryoutchannel = interaction.client.channels.cache.get('978834306577342465');
        if (!interaction.isCommand()) {
            if (interaction.isButton()) {
                if (interaction.customId.startsWith("buttonOther")) {
                var int = await interaction.message

                var intchannel = await interaction.channel
                var intmsg = await interaction.client.channels.cache.get(interaction.channelId).messages.fetch(interaction.message.id)
         //       console.log(intmsg)
                await intmsg.delete().catch(console.error);
        //       interaction.deleteReply()
                

                await interaction.deferReply();
                await wait(2500);
                var int2 = await interaction.editReply(`Please enter a unix EPOCH code as a time. You have sixty seconds.\n\nDon't know where to start?\nYou can look at the link below:\n[Converter](https://www.epochconverter.com/)`)
                const filter = m => interaction.user.id === m.author.id;
                await intchannel.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
                .then(async messages => {
                    await interaction.followUp(`You've entered: ${messages.first().content}`);
                    let inserttime = messages.first().content;
                    var relativetimeString = `<t:${inserttime}:R>`
                    if(isNaN(inserttime)) {
                        return interaction.followUp("This is not a valid timestamp.")
                     }
                     let today = Date.now() / 1000;
                     inserttime = parseInt(inserttime);
                     console.log(`${today} variable today`)
                     console.log(`${inserttime} user input`)
                    if(today > inserttime) {
                        return interaction.followUp(`This timestamp is in the past! I haven't invented time travel yet!\n${relativetimeString}`)
                    }
                    

                    if(interaction.customId.endsWith("VC")) {
                        var embedtitle = "Viking Chieftain"
                        var embedcolor = "911800"
                    } else if(interaction.customId.endsWith("KC")) {
                        var embedtitle = "Knight Commander"
                        var embedcolor = "fffb00"
                    }
                    //const timeString = time(inserttime);
                    var timeString = `<t:${inserttime}>`
                    var relativetimeString = `<t:${inserttime}:R>`
                    const tryoutEmbed = new MessageEmbed()
	                    .setColor(embedcolor)
	                    .setTitle(`${embedtitle} Tryout`)
	                    .setDescription(`There is a tryout at\n${timeString}\nRelative time: ${relativetimeString}\n\nHosted by yours truly,\n<@${interaction.user.id}>`)
                    tryoutchannel.send({ embeds: [tryoutEmbed] });
                })
                .catch((err) => {
                     interaction.followUp('You did not enter any input!');
                     console.error(err)

                }); 
                }
             }
        };

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};