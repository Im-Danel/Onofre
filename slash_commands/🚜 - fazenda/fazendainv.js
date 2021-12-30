const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_inv`)
    .setDescription(`[🚜] » Veja o inventario da sua fazenda`),
run: async (client, interaction) => {

const user = interaction.user

let plant = db.fetch(`plant_${user.id}`)
if(plant === null) plant = 0;

let semente = db.fetch(`sementes_${user.id}`)
if(semente === null) semente = 0;

let cenoura = db.fetch(`Cenouras_${user.id}`)
if(cenoura === null) cenoura = 0;

let alface = db.fetch(`Alfaces_${user.id}`)
if(alface === null) alface = 0;

let fazenda = db.fetch(`fazenda_${user.id}`)

let cc3 = new Discord.MessageEmbed()
.setColor(c.positive)
.setAuthor(user.tag, user.displayAvatarURL())
.setTitle("🚜 \`|\` Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce precisar comprar uma fazenda por 100k de /fazenda comprar.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if(fazenda === null || fazenda === "off")  return interaction.followUp({embeds: [cc3], ephemeral: true})

    let embedplant = new Discord.MessageEmbed()
        .setColor(c.positive)
        .setTitle("🚜 - Fazenda")
        .setDescription(`🥬\`|\`**Alfaces:** \`${alface}\`\n🥕\`|\`**Cenouras:** \`${cenoura}\`\n\n**🌱\`|\`Sementes:** \`${semente}\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907690841164906516/2674527.png")
        .setFooter("Sistema de fazenda em desenvolvimento!")
   interaction.followUp({ embeds: [embedplant] });

}
}