const { SlashCommandBuilder } = require('discord.js');
const { downloadByUrl } = require('../../core/kuku-ytdl-core');
const AudioPlayer = require('../../core/kuku-audioplayer.js');
const fromKeywordToUrl = require('../../core/kuku-utils.js');

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
            const formattedInput = await fromKeywordToUrl(input);

            // metodo per il download 
            const song = await downloadByUrl(formattedInput);
            AudioPlayer.play(song, voiceChannel.guild.id, voiceChannel.id, interaction.guild.voiceAdapterCreator);


            await interaction.reply('Song messa bro lol!');
        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};