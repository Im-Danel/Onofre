const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const db = require('quick.db')
const mysql = require('mysql'); 


module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("[🧬] » Permite ao administrador ou proprietário desbanir algum membro do servidor.")
    .addStringOption(option => option.setName('id').setDescription('Id do membro que quer banir').setRequired(true))
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer banir').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Motivo para desbanir o membro').setRequired(true)),
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
       const user = interaction.options.getUser('user')
       const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

       if(!member) return interaction.followUp("😅 | Incapaz de obter detalhes do membro.");
       const reason = interaction.options.getString('reason')
       const id = interaction.options.getString('id')
       if(!id) return interaction.followUp("😅 | Incapaz de encontrar detalhes do ID mencionado.");
       if (isNaN(id)) {

           let embed = new MessageEmbed()
   
               .setColor("#85dac0")
               .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
   
           return interaction.followUp({ embeds: [ embed ]})
       }
        
       connection.query(`UPDATE vrp_users SET banned = '0' WHERE id = '${id}}'`, (err, rows) => { 
        const embed = new MessageEmbed()
        .setDescription(`🛑 | O ID **${id}** Foi desbanido do servidor \nMotivo: \`${reason}\``)
        .setColor("#303136")
        .setTimestamp()

        member.user.send(`Você foi desbanido do servidor**\`${interaction.guild.name}\`\n** Motivo: \`${reason}\``).catch(err => {})
        return interaction.followUp({ embeds: [ embed ]})
    });
    },
    
};
