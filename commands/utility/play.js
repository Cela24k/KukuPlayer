const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Back to the lobby')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Name of the song searched on yt')
                .setMaxLength(2000)),
    async execute(interaction) {
        console.log(interaction)
        await interaction.reply('dsdsds');
    },
};