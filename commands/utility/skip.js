const { SlashCommandBuilder } = require('discord.js');
const { downloadByUrl, downloadFile } = require('../../core/kuku-ytdl-core');
// const AudioPlayer = require('../../core/kuku-audioplayer.js');
const fromKeywordToUrl = require('../../core/kuku-utils.js');
const AudioPlayerQueue = require('../../core/kuku-player-queue.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song'),
    async execute(interaction) {
        try {
            const voiceChannel = interaction.member.voice.channel;

            if(AudioPlayerQueue.skip(voiceChannel.id))
                await interaction.reply('Canzone skippata bro lol! 👉');
            else
                await interaction.reply('Non ci sono canzoni in coda... 🤔')

        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};