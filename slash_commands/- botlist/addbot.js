const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addbot")
    .setDescription("[🤖] » Adicione o seu bot no servidor.")
    .addStringOption(option => option.setName('id').setDescription('Qual id do seu bot?').setRequired(true))
    .addStringOption(option => option.setName('prefix').setDescription('Qual o prefix do seu bot?').setRequired(true))
    .addStringOption(option => option.setName('descrição').setDescription('Digite a descrição do seu bot.').setRequired(true)),
	run: async (client, interaction) => {
	

    let canalID = db.get(`${interaction.guild.id}_canaladdbot`)
    if(!canalID) return interaction.followUp("Canal addbot não foi setado!")
    let canal = interaction.guild.channels.cache.get(canalID)
    if(!canal) return interaction.followUp("Não consegui encontrar o canal de addbot!")

    if(!interaction.channel.id == canal.id) return interaction.followUp(`Esse comando só pode ser usado em <#${canalID}>`)

	},
};