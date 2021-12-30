const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_comprar`)
    .setDescription(`[🚜] » Compre sua fazenda`),
run: async (client, interaction) => {

const user = interaction.user

let fazenda = db.fetch(`fazenda_${user.id}`)
if(fazenda === null) fazenda = 0;

let member = db.fetch(`kwanzas_${interaction.user.id}`);
if(member == null) member = 0;

const embed4 = new Discord.MessageEmbed()
.setColor(c.positive)
.setTitle("🚜 - Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce não tem [\`100k\`] coins.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if (member < 100000) {
    return interaction.followUp({embeds: [embed4], ephemeral: true});
};

    const cc1 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Voce ja tem uma fazenda comprada de /fazenda e veja os comandos.\``)
    .setFooter("Sistema de fazenda em desenvolvimento!")

    if(fazenda === 'on')  return interaction.followUp({embeds: [cc1], ephemeral: true})

    let amount = 100000;

    let embedplant = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle("🚜 \`|\` Fazenda")
    .setDescription(`<a:online:760269148206661653> **Voce comprou uma fazenda por [\`100k\`] coins de /fazenda para ver os comandos.\n\n :tada: Voce recebeu um brinde de 50 Sementes para começar bem!**`)
    .setFooter("Sistema de fazenda em desenvolvimento!")

   db.set(`fazenda_${user.id}`, "on")
   db.subtract(`kwanzas_${user.id}`, amount)
   db.add(`sementes_${user.id}`, 50)
   interaction.followUp({ embeds: [embedplant] });

}
}