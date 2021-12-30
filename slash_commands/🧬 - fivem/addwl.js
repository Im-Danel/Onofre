const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("addwl")
    .setDescription("[🧬] » Adicione whitelist para um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true)),
	run: async (client, interaction) => {
	
		if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

		let hostdb = db.get(`hostdb_${interaction.guild.id}`);
		if(hostdb == null) return interaction.followUp({ content: "Você ainda não configurou a database (Utilize /configdb HOST)", ephemeral: true })

		let userdb = db.get(`userdb_${interaction.guild.id}`);
    	if(userdb == null) return interaction.followUp({ content: "Você ainda não configurou a database (Utilize /configdb USER)", ephemeral: true })

		let passwordb = db.get(`passwordb_${interaction.guild.id}`);
    	//if(passwordb == null) return interaction.followUp({ content: "Você ainda não configurou a database", ephemeral: true })

		let databasedb = db.get(`databasedb_${interaction.guild.id}`);
    	if(databasedb == null) return interaction.followUp({ content: "Você ainda não configurou a database (Utilize /configdb DATABASE)", ephemeral: true })

		const connection = mysql.createConnection({ 
			host: `${hostdb}`,
			user: `${userdb}`,
			//password: `${passwordb}`,
			database: `${databasedb}`
		  })
		

		/*const connection = mysql.createConnection({ 
			host: "127.0.0.1",
			user: "root",
			//password: "",
			database: "vrp"
		  }) */

		const id = interaction.options.getString('id')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("#85dac0")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

		connection.query(`UPDATE vrp_users SET whitelisted = '1' WHERE id = '${id}'`, (err, rows) => {
			let embed = new MessageEmbed()
 
				.setDescription(`📜 | Whitelist: Adicionado para ID: **${id}**.`)
				.setColor("#85dac0")
 
			return interaction.followUp({ embeds: [ embed ]})
		 });

	},
};