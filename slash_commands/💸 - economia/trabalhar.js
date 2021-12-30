const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require('quick.db')
const c = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
    .setName(`trabalhar`)
    .setDescription(`[💸] » Trabalhe`),
	run: async (client, interaction) => {

    var emprego2 = await db.fetch(`emprego_${interaction.user.id}`)
    var randombom = Math.round(Math.random() * 6000);

    if (emprego2 === null) return interaction.followUp(`**${interaction.user.username}**, você não tem um emprego! Digite /empregos para conseguir um.`)

    if (emprego2 === 1) emprego2 = ("💻 Programador")
    if (emprego2 === 2) emprego2 = ("🔧 Mecanico")
    if (emprego2 === 3) emprego2 = ("🔨 Construtor")
    if (emprego2 === 4) emprego2 = ("🖌️ Designer")
    if (emprego2 === 5) emprego2 = ("🪓 Lenhador")

    const embed = new MessageEmbed()
    .setTitle(`**Trabalhando De: **${emprego2}`)
    .setDescription(`**Clique no botão abaixo para trabalhar**`)
    .setColor(c.neutral)
    .setThumbnail("https://c.tenor.com/DaSh5T93TgUAAAAC/cat-typing.gif")
    .setFooter(`Comando executado por ${interaction.user.tag}`);

    const embed2 = new MessageEmbed()
    .setTitle(`**Você trabalhou de: **${emprego2}`)
    .setDescription(`**E Ganhou ${randombom} Kwanzas.**`)
    .setColor(c.neutral)
    .setThumbnail("https://c.tenor.com/DaSh5T93TgUAAAAC/cat-typing.gif")
    .setFooter(`Comando executado por ${interaction.user.tag}`); 

    let workbtn = new MessageButton()
    .setCustomId(`workbtn`)
    .setEmoji(`👷`)
    .setStyle("SECONDARY")

    let row = new MessageActionRow()
    .addComponents(workbtn);

    let sucessobtn = new MessageButton()
    .setCustomId(`Sucessobtn`)
    .setEmoji(`904141636953571358`)
    .setStyle("SUCCESS")

    let row2 = new MessageActionRow()
    .addComponents(sucessobtn);

    const MESSAGE = await interaction.channel.send({embeds: [embed], components: [row]});

    
    const filter = i => interaction.user.id 
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    
    collector.on('collect', async i => {
        if (i.customId === 'workbtn') {
             //MESSAGE.edit({embeds: [embed2]});
             MESSAGE.edit({embeds: [embed2], components: [row2]});
            await db.add(`kwanzas_${interaction.user.id}`, randombom)
        }
    });

    }}
