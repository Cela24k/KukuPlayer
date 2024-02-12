const { SlashCommandBuilder } = require('discord.js');
const AudioPlayer = require('../../core/kuku-audioplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the track'),
    async execute(interaction) {
        try {
            const response = AudioPlayer.pause();
            if (response)
                await interaction.reply('Successfully paused the track!');
            else
                await interaction.reply('There was a problem pausing the track...');
        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};