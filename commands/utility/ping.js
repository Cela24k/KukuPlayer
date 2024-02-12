const { SlashCommandBuilder } = require('discord.js');
const fromKeywordToUrl = require('../../core/kuku-utils')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('Name of the song searched on yt')
				.setMaxLength(2000)),
	async execute(interaction) {
		const mimmo = interaction.options.getString('input')
		const url = await fromKeywordToUrl(mimmo);
		await interaction.reply('Pong!');
	},
};