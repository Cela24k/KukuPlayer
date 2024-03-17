const { SlashCommandBuilder } = require('discord.js');
const AudioPlayerQueue = require('../../core/kuku-player-queue.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause the track'),
    async execute(interaction) {
        try {
            const voiceChannel = interaction.member.voice.channel;
            const response = AudioPlayerQueue.unpause(voiceChannel.id);
            console.log(response)
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