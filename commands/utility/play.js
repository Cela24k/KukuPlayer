const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Back to the lobby'),
    async execute(interaction) {
        await interaction.reply('Sassa!');
    },
};