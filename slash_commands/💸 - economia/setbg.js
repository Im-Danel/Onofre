const Discord = require("discord.js")
const db = require('quick.db');
const c = require('../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`setbg`)
    .setDescription(`[💸] » Apenas minha equipe pode utilizar`)
    .addUserOption(option => option.setName('user').setDescription('Usuario'))
    .addStringOption(option => option.setName('valor').setDescription('Valor')),
    run: async (client, interaction) => {
    
        const err = new Discord.MessageEmbed()
        .setTitle("🚫 ``|`` Voce não pode utilizar este comando!")
        .setDescription("<a:offline:760269178962968596> Apenas minha equipe de desenvolvedor pode utilizar")
        .setColor(c.positive)

        if (![c.ownerId].includes(interaction.user.id)) {
        return interaction.followUp({embeds: [err]})
        }
      
        const user = interaction.options.getUser('user') || interaction.user
        const valor = interaction.options.getString('valor')

        if(!user) return interaction.followUp(`<a:offline:760269178962968596> \`|\` **Coloque um usuario valido!**`) 
        if(!valor) return interaction.followUp(`<a:offline:760269178962968596> \`|\` **Coloque uma imagem valido!**`) 

        const embedadicionar = new Discord.MessageEmbed()
        .setDescription(`background [${valor}] alterado de ${user.tag}`)
        .setColor(c.positive)
    

        console.log(valor)
        interaction.followUp({embeds: [embedadicionar]})
        db.set(`background_${user.id}`, valor)
    
    }
    }