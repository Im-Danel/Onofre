const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda`)
    .setDescription(`[🚜] » Comandos da fazenda`),
run: async (client, interaction) => {
  
const user = interaction.user

let plant = db.fetch(`plant_${user.id}`)
if(plant === null) plant = 0;

let semente = db.fetch(`sementes_${user.id}`)
if(semente === null) semente = 0;

let fazenda = db.fetch(`fazenda_${user.id}`)
if(fazenda === "off" || fazenda === null || fazenda == false) fazenda = `> <a:offline:760269178962968596> - \`Parece que voce não tem uma Fazenda para comprar-lo digite /fazenda_comprar\``
if(fazenda === "on") fazenda = `> <a:online:760269148206661653> - \`Voce tem uma Fazenda Que legal!\``

let desc = `<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>`
let desc2 = `<:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542>\n<:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542>\n<:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542>\n <:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542><:terra:907089106679529542>\n<:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra1:907331279085764669><:terra:907089106679529542>`


let embed_1 = new Discord.MessageEmbed()
.setColor(c.positive)
.setTitle(`🏡 \`|\` Fazenda`)
.setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907690841164906516/2674527.png")
.setDescription(`**Bem vindo \`${interaction.user.tag}\` a fazenda**\n\n${fazenda}\n\n> **Comandos da fazenda abaixo**`)
.setFooter(user.tag, user.displayAvatarURL())

let painel = new Discord.MessageActionRow().addComponents( new Discord.MessageSelectMenu()
.setCustomId('menu')
.setPlaceholder(`Comandos da fazenda`) 
.addOptions([
{
  label: '/fazenda_comprar',
  emoji: '💸',
  value: 'comprar',
},
{
label: '/fazenda_plantar',
emoji: '🌱',
value: 'plantar',
},

{
label: `/fazenda_colher`,
emoji: '🌿',
value: 'colher',
},
{
label: `/fazenda_vender`,
emoji: '💰',
value: 'vender',
},
{
  label: `/fazenda_inv`,
  emoji: '🎒',
  value: 'inv',
  },
  {
    label: `/fazenda_semente`,
    emoji: '☘️',
    value: 'semente',
    },
  {
    label: `voltar`,
    emoji: '845686426938114098',
    value: 'back',
    },
])
);

interaction.followUp(`${user}`)
interaction.channel.send({ embeds: [embed_1], components: [painel] }).then(msg => {

    const filtro = (interaction) => 
      interaction.isSelectMenu()

    const coletor = msg.createMessageComponentCollector({
      filtro
    });

coletor.on('collect', async (collected) => {
    if(collected.user.id != interaction.user.id) return collected.reply({ content: `<a:offline:760269178962968596> - Apenas o **${interaction.user.tag}** pode interagir com o painel.`, ephemeral: true });

let valor = collected.values[0]
  collected.deferUpdate()

if (valor === 'plantar') {

     const cc1 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🏡 \`|\` Fazenda")
    .setDescription(`**Fazenda_plantar**\n\n > \`Plante sementes em sua fazenda para nascer verduras e vender-los\``)
    msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'colher') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle("🏡 \`|\` Fazenda")
  .setDescription(`**Fazenda_colher**\n\n > \`Recolha suas verduras para vende-los\``)
  msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'vender') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle("🏡 \`|\` Fazenda")
  .setDescription(`**Fazenda_vender**\n\n > \`Venda suas verduras\``)
  msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'inv') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle("🏡 \`|\` Fazenda")
  .setDescription(`**Fazenda_inv**\n\n > \`Veja suas verduras\``)
  msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'comprar') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle("🏡 \`|\` Fazenda")
  .setDescription(`**Fazenda_comprar**\n\n > \`Compre uma fazenda\``)
  msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'semente') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setAuthor(user.tag, user.displayAvatarURL())
  .setTitle("🏡 \`|\` Fazenda")
  .setDescription(`**Fazenda_semente**\n\n > \`Compre uma quantidade de sementes para planta-lo\``)
  msg.edit({ embeds: [cc1], components: [painel] });

}

if (valor === 'back') {

  const cc1 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setTitle(`🏡 \`|\` Fazenda`)
  .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907690841164906516/2674527.png")
  .setDescription(`**Bem vindo \`${interaction.user.tag}\` a fazenda**\n\n${fazenda}\n\n> **Comandos da fazenda abaixo**`)
  .setFooter(user.tag, user.displayAvatarURL())
  msg.edit({ embeds: [cc1], components: [painel] });

}
})})}}