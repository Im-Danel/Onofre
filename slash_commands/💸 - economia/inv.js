const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName(`inventario`)
    .setDescription(`[💸] » Olhe seu inventário`),
	run: async (client, interaction) => {

    const user = interaction.user

    let banco = await db.get(`kwanzas_${interaction.user.id}`)
    if(banco === null) banco = 0;

    let kwanzamao = await db.get(`kwanzas_maos_${interaction.user.id}`)
    if(kwanzamao === null) kwanzamao = 0;

    let bancosujo = await db.get(`kwanzas_sujos_${interaction.user.id}`)
    if(bancosujo === null) bancosujo = 0;

    let xp = await db.get(`xp_${interaction.user.id}`)
    if(xp === null) xp = 0;

    let plant = db.fetch(`plant_${user.id}`)
    if(plant === null) plant = 0;

    let semente = db.fetch(`sementes_${user.id}`)
    if(semente === null) semente = 0;

    let cenoura = db.fetch(`Cenouras_${user.id}`)
    if(cenoura === null) cenoura = 0;

    let alface = db.fetch(`Alfaces_${user.id}`)
    if(alface === null) alface = 0;

     function progressDef(current, total, barSize) {
        const progressDefesa = Math.round((barSize*current)/total)
      
        return '▮'.repeat(progressDefesa) + '▯'.repeat(barSize-progressDefesa)
      }
      let lifi = progressDef(xp, 100, 10)


    let embed_inv = new MessageEmbed()
    .setTitle(`> 🎒 **|** Seu Inventário`)
    .setDescription(`⠀⠀\n> <a:seta:760269024050675722> *Veja seu Dinheiro, Sementes, Xp, Etc...*`)
    .addFields(
        {
            name: `⠀⠀\n<:status:808397847484825670> **|** XP`,
            value: `⠀⠀⠀⠀\n> ⚡${lifi} [ **${xp}** / **100** ]⠀⠀`,
            inline: false
        },
        {
            name: `⠀⠀\n💸 **|** Economia`,
            value: `⠀⠀⠀⠀\n> 💷 **${banco}**\n\n> <:sujo:920473067359182888> **${bancosujo}**\n\n> 🖐️ **${kwanzamao}**\n⠀⠀`,
            inline: false
        },
        {
            name: `⠀⠀\n🚜 **|** Fazenda⠀⠀`,
            value: `⠀⠀⠀⠀\n> 🥬 **${alface}**\n\n> 🥕 **${cenoura}**\n\n> 🌱 **${semente}**`,
            inline: true
        }
    )
    interaction.followUp({ embeds: [embed_inv] });

}};