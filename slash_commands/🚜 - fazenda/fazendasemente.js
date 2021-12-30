const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_semente`)
    .setDescription(`[🚜] » Compre sementes para a fazenda`)
    .addStringOption(option => option.setName('quantidade').setDescription('Quantidade de sementes que deseja comprar')),
run: async (client, interaction) => {

const user = interaction.user

let fazenda = db.fetch(`fazenda_${user.id}`)

let semente = db.fetch(`sementes_${user.id}`)
if(semente === null) semente = 0;

let member = db.fetch(`kwanzas_${interaction.user.id}`);
if(member == null) member = 0;

let valor = interaction.options.getString(`quantidade`)
let valorsemente = valor * 1500

let cc3 = new Discord.MessageEmbed()
.setColor(c.positive)
.setAuthor(user.tag, user.displayAvatarURL())
.setTitle("🚜 \`|\` Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce precisar comprar uma fazenda por 100k de /fazenda comprar.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if(fazenda === null || fazenda === "off")  return interaction.followUp({embeds: [cc3], ephemeral: true})

let embedinfo = new Discord.MessageEmbed()
.setColor(c.positive)
.setTitle("🚜 - Fazenda")
.setDescription(`> 👩‍🌾 **Bem vindo \`${interaction.user.tag}\` a loja de sementes.**\n\n> **👛 Preços:**\n🌱\`|\`**Sementes:** \`1 = [R$1500]\``)
.setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907691577302999100/4857160.png")
.setFooter("Sistema de fazenda em desenvolvimento!")

if (valor === null) return interaction.followUp({ embeds: [embedinfo] })

const embed5 = new Discord.MessageEmbed()
.setColor(c.positive)
.setTitle("🚜 - Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce não pode comprar [${valor}] sementes.\``)

if(valor < 1) return interaction.followUp({embeds: [embed5], ephemeral: true})

const embed4 = new Discord.MessageEmbed()
.setColor(c.positive)
.setTitle("🚜 - Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce não tem [${valorsemente}] coins.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if (member < valorsemente) {
    return interaction.followUp({embeds: [embed4], ephemeral: true});
};

const sorte = [
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
    "Sim",
    "Nao",
]

let amount = Math.floor(Math.random() * 1) + 5;
let sortefim = sorte[Math.floor(Math.random() * sorte.length)]

if(sortefim === `Sim`) {
    let embedplant = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`**<a:online:760269148206661653> - Compra feita com sucesso!\n\n Voce recebeu: \n> 🌱 \`[${valor}]\` Sementes\n> <:carteira:896999905967616061> Valor: \`[${valorsemente}]\`\n\n :tada: Voce recebeu um brinde de [\`${amount}\`] Sementes!**`)
    .setFooter("Sistema de fazenda em desenvolvimento!")
    .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907691577302999100/4857160.png")

   db.subtract(`kwanzas_${user.id}`, valorsemente)
   db.add(`sementes_${user.id}`, valor)
   db.add(`sementes_${user.id}`, amount)
   interaction.followUp({ embeds: [embedplant] })
}

if(sortefim === `Nao`) {
    let embedplant = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`**<a:online:760269148206661653> - Compra feita com sucesso!\n\n Voce recebeu: \n> 🌱 \`[${valor}]\` Sementes\n> <:carteira:896999905967616061> Valor: \`[${valorsemente}]\`**`)
    .setFooter("Sistema de fazenda em desenvolvimento!")
    .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907691577302999100/4857160.png")

   db.subtract(`kwanzas_${user.id}`, valorsemente)
   db.add(`sementes_${user.id}`, valor)
   interaction.followUp({ embeds: [embedplant] })
}

   cooldown.add(interaction.user.id);
   setTimeout(() => {
       cooldown.delete(interaction.user.id)
   }, `${tempo_em_milisegundos}`);
}
}