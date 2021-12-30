const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName('configbotlist')
	.setDescription("[🤖] » Configure o botlist.")
	.addStringOption(option =>
		option.setName('configcanal')
			.setDescription('Escolha oque quer configurar')
			.setRequired(true)
            .addChoice('Canal Add Bot', 'canaladdbot')
            .addChoice('Canal Logs', 'canallogs')
			.addChoice('Canal Correio', 'canalcorreio'))
            .addChannelOption(option => option.setName('canal').setDescription('Canal').setRequired(true)),
    run: async (client, interaction) => {
	
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

        const escolha = interaction.options.get('configcanal').value;
        const canal = interaction.options.getChannel('canal')

        db.set(`${interaction.guild.id}_${escolha}`, canal)

        let embed = new MessageEmbed()
	
				.setColor("#85dac0")
				.addField(`**Config Botlist**`, `Você setou para **${escolha}** o canal **${canal}**`)
	
		interaction.followUp({ embeds: [ embed ]})

	},
};