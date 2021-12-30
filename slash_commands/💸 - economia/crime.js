const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("[💸] » Cometa um crime"),
	run: async (client, interaction) => {

		var randombom = Math.round(Math.random() * 5000);
		var randomruim = Math.round(Math.random() * 2000);

		let randomMessage = [
		  `Você assassinou Marquinhos Zuckerberg e foi pago em ${randombom.toLocaleString()} kwanzas sujos.`,
		  `Você foi preso pela polícia e pagou ${randomruim.toLocaleString()} para um policial corrupto e ele lhe passou response perna.`,
		  `Você fez uma pessoa de refém e foi capturado, porém ofereceu ${randomruim.toLocaleString()} para um policial corrupto e foi preso por suborno.`,
		  `Você clonou um cartão e faturou com ele ${randombom.toLocaleString()} kwanzas sujos.`,
		  `Alguém hackeou sua conta bancária e roubaram ${randomruim.toLocaleString()} kwanzas sujos.`,

          `Você entrou em uma casa e encontrou uma caixa.`,

          `Você assassinou Marquinhos Zuckerberg e foi pago em ${randombom.toLocaleString()} kwanzas sujos.`,
		  `Você foi preso pela polícia e pagou ${randomruim.toLocaleString()} para um policial corrupto e ele lhe passou response perna.`,
		  `Você fez uma pessoa de refém e foi capturado, porém ofereceu ${randomruim.toLocaleString()} para um policial corrupto e foi preso por suborno.`,
		  `Você clonou um cartão e faturou com ele ${randombom.toLocaleString()} kwanzas sujos.`,
		  `Alguém hackeou sua conta bancária e roubaram ${randomruim.toLocaleString()} kwanzas sujos.`,
		];
		let response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

		let begembed = new MessageEmbed()
		.setColor("GREEN")
		.setTitle(`🕵️ Crimes`)
		.setDescription(`🔫 | ${response}`)

	if (response==`Você assassinou Marquinhos Zuckerberg e foi pago em ${randombom.toLocaleString()} kwanzas sujos.`) 
    {
        await db.add(`kwanzas_sujos_${interaction.user.id}`, randombom)
    }
    else if (response==`Você foi preso pela polícia e pagou ${randomruim.toLocaleString()} para um policial corrupto e ele lhe passou response perna.`)
    {
        await db.subtract(`kwanzas_sujos_${interaction.user.id}`, randomruim)
    }

    else if (response==`Você entrou em uma casa e encontrou uma caixa.`)
    {
        await db.add(`box_${interaction.user.id}`, 1)
    }
    
    else if (response==`Você fez uma pessoa de refém e foi capturado, porém ofereceu ${randomruim.toLocaleString()} para um policial corrupto e foi preso por suborno.`)
    {
        await db.subtract(`kwanzas_sujos_${interaction.user.id}`, randomruim)
    }
    else if (response==`Você clonou um cartão e faturou com ele ${randombom.toLocaleString()} kwanzas sujos.`)
    {
        await db.add(`kwanzas_sujos_${interaction.user.id}`, randombom)
    }
	else if (response==`Alguém hackeou sua conta bancária e roubaram ${randomruim.toLocaleString()} kwanzas sujos.`)
    {
        await db.subtract(`kwanzas_sujos_${interaction.user.id}`, randomruim)
    };
	
		await interaction.followUp({ embeds: [ begembed ]})
	},
};