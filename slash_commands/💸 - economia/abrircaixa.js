const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("abrircaixa")
    .setDescription("[💸] » Abra suas caixas coletadas"),
	run: async (client, interaction) => {
    
        let caixa = db.fetch(`caixa_${interaction.user.id}`);
        if(caixa == null) caixa = 0;
    

let embed2 = new MessageEmbed()
 .setDescription( `Abra suas caixas coletadas! 
 Como usar?\`/abrircaixa\`
 Lembrando que não dá para abrir uma caixa sem ter uma! Você tem ${caixa} caixa(s)!`)
 .setColor("ff58c3")
 .setFooter(`Oque será que tem nessas caixas?`)
 .setTimestamp();

 if (caixa <= 1) {
    return interaction.followUp({ embeds: [ embed2 ]})
};

    let quantia = Math.floor(Math.random() * 10000) + 1000;
    let embed = new MessageEmbed()
    .setTitle("🎉 Você abriu sua caixa!")
    .setDescription(`📦 Na caixa tinha:
    Kwanzas: \`${quantia}\`

    Agora você possui ${caixa} caixas!
    
    `)
    .setColor("ff58c3")
    .setTimestamp();
 
    await interaction.followUp({ embeds: [ embed ]})
    db.add(`kwanza_${interaction.user.id}`, quantia);
    db.subtract(`caixa_${interaction.user.id}`, 1)

	},
};