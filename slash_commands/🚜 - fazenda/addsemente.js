const Discord = require("discord.js")
const db = require('quick.db');
const c = require("../../config.json")
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`addsemente`)
    .setDescription(`[🚜]» Apenas minha equipe pode utilizar`)
    .addUserOption(option => option.setName('user').setDescription('Usuario'))
    .addStringOption(option => option.setName('valor').setDescription('Valor')),
    run: async (client, interaction) => {

        let erro = new Discord.MessageEmbed()
    
        const err = new Discord.MessageEmbed()
        .setTitle("🚫 ``|`` Voce não pode utilizar este comando!")
        .setDescription("<a:offline:760269178962968596> Apenas minha equipe de desenvolvedor pode utilizar")
        .setColor(c.negative)

        if (![c.ownerId].includes(interaction.user.id)) {
        return interaction.followUp({embeds: [err]})
        }
      
        const user = interaction.options.getUser('user')
        const valor = interaction.options.getString('valor')

        if(!user) return interaction.followUp(`<a:offline:760269178962968596> \`|\` **Coloque um usuario valido!**`) 
        if(!valor) return interaction.followUp(`<a:offline:760269178962968596> \`|\` **Coloque um valor valido!**`) 

        if(valor < 50) return interaction.followUp(`**🚫 ${interaction.user}, Não pode adicionar números abaixo de \`50\`!**`)

        if (isNaN(valor)) return interaction.followUp(`<a:offline:760269178962968596> \`|\` **Coloque um numero valido!**`)
        

        const embedadicionar = new Discord.MessageEmbed()
        .setDescription(`<a:online:760269148206661653> \`|\` **Adicionado o valor \n\n👨‍🌾 » Usuario: ${user}\n\n👛 » Valor: \`${valor}\`\n\n<:Computer:902370443531522070> » Staff que adicionou:** ${interaction.user}`)
        .setColor(c.positive)
    
        interaction.followUp({embeds: [embedadicionar]})
        db.add(`sementes_${user.id}`, valor)
    
    }
    }