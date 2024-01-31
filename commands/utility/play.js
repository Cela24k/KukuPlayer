const { SlashCommandBuilder } = require('discord.js');
const { downloadByUrl } = require('../../core/kuku-ytdl-core'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Back to the lobby')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Name of the song searched on yt')
                .setMaxLength(2000)),
    async execute(interaction) {
        const input = interaction.options.getString('input');

        // metodo per il download 
        await downloadByUrl(input).then((res)=>{
            console.log(res)
        })

        await interaction.reply('Sassa!');
    },
};