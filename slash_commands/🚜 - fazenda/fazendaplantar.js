const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_plantar`)
    .setDescription(`[🚜] » Plante em sua fazenda`),
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


//let desc = `<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>\n<:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542>`
//let desc2 = `<:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542>\n <:terra:907089106679529542><:terra:907089106679529542><:terra:907089106679529542><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542><:terra:907089106679529542>\n<:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra1:892056169567371314><:terra:907089106679529542>`

    const cc1 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Você só poderá plantar novamente quando coletar suas verduras no colher.\``)
    .setFooter("Sistema de fazenda em desenvolvimento!")
    
    const cc2 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Você precisa ter acima de 20 sementes para plantar.\``)
    .setFooter("Sistema de fazenda em desenvolvimento!")

    
    if(plant === 'on')  return interaction.followUp({embeds: [cc1], ephemeral: true})
    if(semente < 20) return interaction.followUp({embeds: [cc2], ephemeral: true})

    let embedplant = new Discord.MessageEmbed()
        .setColor(c.positive)
        .setAuthor(user.tag, user.displayAvatarURL())
        .setTitle("🚜 \`|\` Fazenda")
        .setDescription(`> **🌱 Parabens! Você plantou \`[20]\` sementes.**`)
        .setFooter("Sistema de fazenda em desenvolvimento!")
        .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907690169883299870/4481740.png")

   db.set(`plant_${user.id}`, "on")
   db.subtract(`sementes_${user.id}`, 20)
   db.set(`fazendaplantar_${interaction.user.id}`, Date.now())
   interaction.followUp({ embeds: [embedplant] });

}
}