const { SlashCommandBuilder } = require('discord.js');
const AudioPlayer = require('../../core/kuku-audioplayer.js');
const AudioPlayerQueue = require('../../core/kuku-player-queue.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the track'),
    async execute(interaction) {
        try {
            const voiceChannel = interaction.member.voice.channel;
            const response = AudioPlayerQueue.pause(voiceChannel.id);
            
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