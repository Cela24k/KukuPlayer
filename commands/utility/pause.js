const { SlashCommandBuilder } = require('discord.js');
const { downloadByUrl } = require('../../core/kuku-ytdl-core');
const AudioPlayer = require('../../core/kuku-audioplayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the track'),
    async execute(interaction) {
        try {
            const response = AudioPlayer.pause();
            console.log(response)
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