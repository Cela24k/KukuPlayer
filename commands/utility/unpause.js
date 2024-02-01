const { SlashCommandBuilder } = require('discord.js');
const AudioPlayer = require('../../core/kuku-audioplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause the track'),
    async execute(interaction) {
        try {
            const response = AudioPlayer.unpause();
            if (response)
                await interaction.reply('Successfully resumed the track!');
            else
                await interaction.reply('There was a problem resuming the track...');
        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};