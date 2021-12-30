const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require('quick.db')
const c = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
    .setName(`demissão`)
    .setDescription(`[💸] » Se demita do seu emprego`),
	run: async (client, interaction) => {

        let saldo = await db.get(`kwanzas_${interaction.user.id}`)
        if (saldo < 500) return interaction.followUp('Para pedir demissão, você necessita de **R$ 500**!')
       
       let emprego = await db.get(`emprego_${interaction.user.id}`) 

       if (emprego === null) {
        return interaction.followUp('Você não possui um emprego para demissão...')
      }
      
       if (emprego === 1) {
        interaction.followUp('Você pediu demissão com sucesso!')
        db.delete(`emprego_${interaction.user.id}`, 1) 
        db.subtract(`kwanzas_${interaction.user.id}`, 500) 
      }
      if (emprego === 2) {
        interaction.followUp('Você pediu demissão com sucesso!')
        db.delete(`emprego_${interaction.user.id}`, 2) 
        db.subtract(`kwanzas_${interaction.user.id}`, 500)
      }
      if (emprego === 3) {
        interaction.followUp('Você pediu demissão com sucesso!')
        db.delete(`emprego_${interaction.user.id}`, 3) 
        db.subtract(`kwanzas_${interaction.user.id}`, 500) 
      }
      if (emprego === 4) {
        interaction.followUp('Você pediu demissão com sucesso!')
        db.delete(`emprego_${interaction.user.id}`, 4)
        db.subtract(`kwanzas_${interaction.user.id}`, 500) 
      }
      if (emprego === 5) {
        interaction.followUp('Você pediu demissão com sucesso!')
        db.delete(`emprego_${interaction.user.id}`, 5) 
        db.subtract(`kwanzas_${interaction.user.id}`, 500)
      }
    }}