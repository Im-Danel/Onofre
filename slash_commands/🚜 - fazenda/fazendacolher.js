const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_colher`)
    .setDescription(`[🚜] » Colha suas verduras em sua fazenda`),
run: async (client, interaction) => {

const user = interaction.user

let plant = db.fetch(`plant_${user.id}`)
if(plant === null) plant = 0;

let semente = db.fetch(`sementes_${user.id}`)
if(semente === null) semente = 0;

let fazenda = db.fetch(`fazenda_${user.id}`)

let cc3 = new Discord.MessageEmbed()
.setColor(c.positive)
.setAuthor(user.tag, user.displayAvatarURL())
.setTitle("🚜 \`|\` Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce precisar comprar uma fazenda por 100k de /fazenda comprar.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if(fazenda === null || fazenda === "off")  return interaction.followUp({embeds: [cc3], ephemeral: true})

const alfaces = [
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces",
    "Alfaces"
      ]

const cenoura = [
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras",
        "Cenouras"
    ]

let amount = Math.floor(Math.random() * 2) + 5;
let amount2 = Math.floor(Math.random() * 2) + 3;
let cenouralist = cenoura[Math.floor(Math.random() * cenoura.length)]
let alfacelist = alfaces[Math.floor(Math.random() * alfaces.length)]

let desc = `<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>`
let desc2 = `<:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314>\n <:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314>`

let timeout = 1.08e+7;
let cooldowntime = await db.fetch(`fazendaplantar_${interaction.user.id}`);

if (cooldowntime !== null && timeout - (Date.now() - cooldowntime) > 0) {
 let time = ms(timeout - (Date.now() - cooldowntime));

 const cooldown = new Discord.MessageEmbed()
 .setColor(c.positive)
 .setAuthor(user.tag, user.displayAvatarURL())
 .setTitle("🚜 \`|\` Fazenda")
 .setDescription(`> **<:Timer:896952881691893770> Aguarde, sua plantação está nascendo.**\nEspere: \`[${time.hours}] Horas\` e \`[${time.minutes}] Minuto(s)\` e \`[${time.seconds}] Segundo(s)\``)
 .setFooter("Sistema de fazenda em desenvolvimento!")

 interaction.followUp({embeds: [cooldown]})
} else {

const cc1 = new Discord.MessageEmbed()
.setColor(c.positive)
.setAuthor(user.tag, user.displayAvatarURL())
.setTitle("🚜 \`|\` Fazenda")
.setDescription(`> <a:offline:760269178962968596> \`Você não plantou nenhuma semente em sua fazenda!\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if(plant === 'off' || plant === null) return interaction.followUp({embeds: [cc1], ephemeral: true})

    let embedplant = new Discord.MessageEmbed()
        .setColor(c.positive)
        .setAuthor(user.tag, user.displayAvatarURL())
        .setTitle("🚜 \`|\` Fazenda")
        .setDescription(`> **🚜 - Você recebeu:**\n> **🌱 [\`${amount2}\`] sementes**\n> **🥕 [\`${amount}\`] ${cenouralist}**\n> 🥬 **[\`${amount}\`] ${alfacelist}**`) 
        .setFooter("Sistema de fazenda em desenvolvimento!")
        .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907689979407400990/2674614.png")
        

   db.set(`plant_${user.id}`, "off")
   db.add(`${cenouralist}_${user.id}`, amount)
   db.add(`${alfacelist}_${user.id}`, amount)
   interaction.followUp({ embeds: [embedplant] });

}
}
}