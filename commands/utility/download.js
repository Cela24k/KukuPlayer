const { SlashCommandBuilder } = require('discord.js');
const { downloadFile } = require('../../core/kuku-ytdl-core');
const AudioPlayer = require('../../core/kuku-audioplayer.js');
const { AttachmentBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('download')
        .setDescription('Download the track')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Name of the song searched on yt')
                .setMaxLength(2000))
        .addStringOption(option =>
            option.setName('format')
                .setDescription('Format of the downloaded file')
                .setMaxLength(2000)), // TODO edit this 
    async execute(interaction) {
        try {
            const input = interaction.options.getString('input');
            const format = interaction.options.getString('input');

            await interaction.reply('I am downloading the file...');

            // download 
            await downloadFile(input, format).then(async (res)=>{
                const attachment = new AttachmentBuilder(res, `audio.${format}`);
                await interaction.followUp('ciao', { files: [attachment] });
            })

        } catch (err) {
            console.log(err)
            await interaction.reply('An error has occurred')
        }
    },
};