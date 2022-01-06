const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("abrircaixa")
    .setDescription("[💸] » Abra suas caixas coletadas"),
	run: async (client, interaction) => {
    
        const user = interaction.user

        let caixa = db.fetch(`caixa_${user}`)
        if(caixa == null) caixa = 0;
        
    

let embed2 = new MessageEmbed()
 .setDescription( `Abra suas caixas coletadas! 
 Como usar?\`/abrircaixa\`
 Lembrando que não dá para abrir uma caixa sem ter uma! Você tem ${caixa} caixa(s)!`)
 .setColor("ff58c3")

 if (caixa <= 1) {
    return interaction.followUp({ embeds: [ embed2 ]})
};

    let quantia = Math.floor(Math.random() * 10000) + 1000;

    let embed1 = new MessageEmbed()
    .setTitle("🎉 Abrindo sua caixa!")
    .setImage('https://i.pinimg.com/originals/fd/2c/1a/fd2c1a96b654e220d09525f006482477.gif')

    let embed = new MessageEmbed()
    .setTitle("🎉 Você abriu sua caixa!")
    .setDescription(`📦 Na caixa tinha:
    Kwanzas: \`${quantia}\`

    Agora você possui ${caixa} caixas!
    
    `)
    .setColor("ff58c3")
    .setTimestamp();
 
    interaction.followUp({ embeds: [ embed1 ]})
    .then(msg=>{
        setTimeout(function(){
     msg.edit({embeds: [embed]});
    }, 5000)
    })

    db.add(`kwanza_${interaction.user.id}`, quantia);
    db.subtract(`caixa_${interaction.user.id}`, 1)

	},
};