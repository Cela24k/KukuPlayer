const { SlashCommandBuilder } = require('discord.js');
const { downloadAudio } = require('../../core/kuku-ytdl-core');
const AudioPlayer = require('../../core/kuku-audioplayer.js');

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
            const input = interaction.options.getString('input');
            const voiceChannel = interaction.member.voice.channel;
            // metodo per il download 
            await downloadAudio(input).then((res) => {
                AudioPlayer.play(res, voiceChannel.guild.id, voiceChannel.id, interaction.guild.voiceAdapterCreator)
            })

            await interaction.reply('Song messa bro lol!');
        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};