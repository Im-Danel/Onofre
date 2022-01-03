const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("autoconnect")
    .setDescription("[🧬] » Adicione whitelist para um jogador."),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

		let tslink = db.get(`tslink_${interaction.guild.id}`);
		if(tslink == null) return interaction.followUp({ content: "Você ainda não configurou a database (Utilize /configdb HOST)", ephemeral: true })

		let fivemlink = db.get(`fivemlink_${interaction.guild.id}`);
    	if(fivemlink == null) return interaction.followUp({ content: "Você ainda não configurou a database (Utilize /configdb USER)", ephemeral: true })

		let pluginlink = db.get(`pluginlink_${interaction.guild.id}`);
    	if(pluginlink == null) return interaction.followUp({ content: "Você ainda não configurou a database", ephemeral: true })

			let embed = new MessageEmbed()
 
				.setDescription(`📜 | .`)
				.setColor("#85dac0")
 
			return interaction.followUp({ embeds: [ embed ]})
	},
};