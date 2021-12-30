const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require('quick.db')
const c = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
    .setName(`empregos`)
    .setDescription(`[💸] » Pegue seu emprego para trabalhar`),
	run: async (client, interaction) => {

		var emprego = await db.get(`emprego_${interaction.user.id}`)
		if (emprego === 1) return interaction.followUp(`**${interaction.user.username}**, você já tem um emprego! (💻 Programador)`)
		if (emprego === 2) return interaction.followUp(`**${interaction.user.username}**, você já tem um emprego! (🔧 Mecânico)`)
		if (emprego === 3) return interaction.followUp(`**${interaction.user.username}**, você já tem um emprego! (🔨 Construtor)`)
		if (emprego === 4) return interaction.followUp(`**${interaction.user.username}**, você já tem um emprego! (🖌️ Designer)`)
		if (emprego === 5) return interaction.followUp(`**${interaction.user.username}**, você já tem um emprego! (🪓 Lenhador)`)

		const embed = new MessageEmbed()
               .setDescription(`👋 | Prazer ${interaction.user}\n\n **📝 | Agencia de Empregos\n\n 💻 Programador\n🔧 Mecanico\n🔨 Construtor\n🖌️ Designer\n🪓 Lenhador**`)
               .setColor(c.neutral)
               .setThumbnail("https://c.tenor.com/DaSh5T93TgUAAAAC/cat-typing.gif")
               .setFooter(`Comando executado por ${interaction.user.tag}`);
           
               const Programador1 = new MessageEmbed()
               .setDescription(`${interaction.user} Voce Agora faz Parte: \`💻 Programador\``)
               .setColor(c.positive)
           
               const Minerador2 = new MessageEmbed()
               .setDescription(`${interaction.user} Voce Agora faz Parte: \`⛏️ Minerador\``)
               .setColor(c.positive)
           
               const Construtor3 = new MessageEmbed()
               .setDescription(`${interaction.user} Voce Agora faz Parte: \`🔨 Construtor\``)
               .setColor(c.positive)
           
               const Designer4 = new MessageEmbed()
               .setDescription(`${interaction.user} Voce Agora faz Parte: \`🖌️ Designer\``)
               .setColor(c.positive)
           
               const Machado5 = new MessageEmbed()
               .setDescription(`${interaction.user} Voce Agora faz Parte: \`🪓 Lenhador\``)
               .setColor(c.positive)

			   let button1 = new MessageButton()
               .setCustomId(`Programador`)
               .setEmoji(`💻`)
               .setStyle("SECONDARY")
           
               let button2 = new MessageButton()
               .setCustomId(`Minerador`)
               .setEmoji(`⛏️`)
               .setStyle("SECONDARY")
           
               let button3 = new MessageButton()
               .setCustomId(`Construtor`)
               .setEmoji(`🔨`)
               .setStyle("SECONDARY")
           
               let button4 = new MessageButton()
               .setCustomId(`Designer`)
               .setEmoji(`🖌️`)
               .setStyle("SECONDARY")
           
               let button5 = new MessageButton()
               .setCustomId(`Machado`)
               .setEmoji(`🪓`)
               .setStyle("SECONDARY")
           
           
               let row = new MessageActionRow()
               .addComponents(button1, button2, button3, button4, button5);
     
               let sucessobtn = new MessageButton()
               .setCustomId(`Sucessobtn`)
               .setEmoji(`904141636953571358`)
               .setStyle("SUCCESS")
     
               let row2 = new MessageActionRow()
               .addComponents(sucessobtn);

			   
			   interaction.followUp("ㅤ")
               const MESSAGE = await interaction.channel.send({embeds: [embed], components: [row]});
           
               const filter = ( button ) => button.clicker.user.customId === interaction.user.id 
               const collector = MESSAGE.createMessageComponentCollector(filter, { time : 120000 });
           
               collector.on('collect', async (b) => {

				                   if(b.customId == "Programador") {
           
                     MESSAGE.edit({embeds: [Programador1], components: [row2]});
                     db.add(`emprego_${interaction.user.id}`, 1)
                     await b.deferUpdate();
                   }
           
                   if (b.customId == "Minerador") {
                     MESSAGE.edit({embeds: [Minerador2], components: [row2]});
                     db.add(`emprego_${interaction.user.id}`, 2)
                     await b.deferUpdate();
                   }
           
                   if (b.customId == "Construtor") {
                     MESSAGE.edit({embeds: [Construtor3], components: [row2]});
                     db.add(`emprego_${interaction.user.id}`, 3)
                     await b.deferUpdate();
                   }
           
                   if (b.customId == "Designer") {
                     MESSAGE.edit({embeds: [Designer4], components: [row2]});
                     db.add(`emprego_${interaction.user.id}`, 4)
                     await b.deferUpdate();
                 }
           
                 if (b.customId == "Machado") {
                 MESSAGE.edit({embeds: [Machado5], components: [row2]});
                   db.add(`emprego_${interaction.user.id}`, 5)
                   await b.deferUpdate();
				 }   
	})},
};