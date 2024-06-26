const { SlashCommandBuilder } = require('discord.js');
const { downloadByUrl, downloadFile } = require('../../core/kuku-ytdl-core');
// const AudioPlayer = require('../../core/kuku-audioplayer.js');
const fromKeywordToUrl = require('../../core/kuku-utils.js');
const AudioPlayerQueue = require('../../core/kuku-player-queue.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Back to the lobby')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Name of the song searched on yt')
                .setMaxLength(2000)),
    async execute(interaction) {
        try {
            await interaction.reply('Sto cercando la tua canzone... 🧐');
            const input = interaction.options.getString('input');
            const voiceChannel = interaction.member.voice.channel;
            const formattedInput = await fromKeywordToUrl(input);
            // metodo per il download 
            const song = await downloadFile(formattedInput);
            const isQueued = AudioPlayerQueue.play(song, voiceChannel.guild.id, voiceChannel.id, interaction.guild.voiceAdapterCreator);
            if(isQueued)
                await interaction.followUp("Ho messo la canzone in coda! 👍")
            else
                await interaction.followUp("Song messa bro lol! 🎶")

        } catch (err) {
            console.log(err)
            await interaction.followUp('Qualcosa è andato storto 🤣')
        }
    },
};