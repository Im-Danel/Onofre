const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName('configdb')
	.setDescription("[🧬] » Configure a database.")
	.addStringOption(option =>
		option.setName('configdb')
			.setDescription('Escolha oque quer configurar')
			.setRequired(true)
            .addChoice('HOST/IP', 'hostdb')
            .addChoice('USER', 'userdb')
            .addChoice('PASSWORD', 'passwordb')
            .addChoice('PORTA', 'portadb')
			.addChoice('DATABASE', 'databasedb'))
            .addStringOption(option => option.setName('valor').setDescription('Valor').setRequired(true)),
    run: async (client, interaction) => {
	
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

        const escolha = interaction.options.get('configdb').value;
        const valor = interaction.options.getString('valor')

        console.log(`${escolha}_${interaction.guild.id} ${valor}`)
        db.set(`${escolha}_${interaction.guild.id}`, valor)

        let embed = new MessageEmbed()
	
				.setColor("#85dac0")
				.addField(`**Database**`, `Você setou para **${escolha}** o valor **${valor}**`)
	
		interaction.followUp({ embeds: [ embed ]})

	},
};