const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const mysql = require('mysql'); 

module.exports = {
	data: new SlashCommandBuilder()
    .setName("alterarplaca")
    .setDescription("[🧬] » Altere a placa do placa de um jogador.")
	.addStringOption(option => option.setName('id').setDescription('Id').setRequired(true))
	.addStringOption(option => option.setName('placa').setDescription('placa').setRequired(true)),
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

		const id = interaction.options.getString('id')
		const placa = interaction.options.getString('placa')

		if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
		if(!placa) return interaction.followUp("😅 | Incapaz de encontrar detalhes do placa mencionado.");

		if (isNaN(id)) {

			let embed = new MessageEmbed()
	
				.setColor("#85dac0")
				.addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
	
			return interaction.followUp({ embeds: [ embed ]})
		}

        if (placa.length !== 8) {
            let embed = new MessageEmbed()
    
                .setColor("#303136")
                .addField(`**Ocorreu um erro.**`, "```yaml\nErro: A placa só pode conter exatos 8 dígitos!```")
    
                return interaction.followUp({ embeds: [ embed ]})
        }

        connection.query(`UPDATE vrp_user_identities SET registration = '${placa}' WHERE user_id = '${id}'`, (err, rows) => { 

            let embed = new MessageEmbed()

                .setDescription(`:white_check_mark: | O ID **${id}** Teve a placa alterada para **${placa}**.`)
                .setColor("#303136")

                return interaction.followUp({ embeds: [ embed ]})

        });

	},
};