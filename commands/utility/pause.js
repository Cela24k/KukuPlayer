const { SlashCommandBuilder } = require('discord.js');
const AudioPlayer = require('../../core/kuku-audioplayer.js');
const AudioPlayerPool = require('../../core/kuku-playerpool.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the track'),
    async execute(interaction) {
        try {
            const voiceChannel = interaction.member.voice.channel;
            const response = AudioPlayerPool.pause(voiceChannel.id);
            
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