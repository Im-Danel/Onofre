const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addcaixa")
    .setDescription("[💸] » Adicione uma caixa a alguém")
    .addUserOption(option => option.setName('user').setDescription('Usuario').setRequired(true))
    .addStringOption(option => option.setName('quant').setDescription('Quantia').setRequired(true)),
	run: async (client, interaction) => {

    const user = interaction.options.getUser('user')
    const quaant = interaction.options.getString('quant')
 
    let caixa = db.fetch(`caixa_${user}`);
    if(caixa == null) caixa = 0;

    db.add(`caixa_${user}`, quaant);

    let caixa2 = db.fetch(`caixa_${user}`);
    if(caixa2 == null) caixa2 = 0;

    let embed = new MessageEmbed()
    .setTitle("🎉 Caixa adicionada!")
    .setDescription(`📦Agora o user ${user} possui ${caixa2} caixas!`)
    .setColor("ff58c3")
    .setTimestamp();
    await interaction.followUp({ embeds: [ embed ]})
	},
};