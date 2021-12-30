const discord = require('discord.js')
const { 
    Message, 
    Client, 
    MessageActionRow, 
    MessageButton,
    MessageEmbed,
} = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName(`clear`)
    .setDescription(`[🔨] » Limpe mensagens no chat`)
    .addStringOption(option => option.setName('msg').setDescription('Quantas Mensagens deseja apagar').setRequired(true)),
	run: async (client, interaction) => {

        const msg = interaction.options.getString('msg')

        let clearbutton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("sim")
            .setLabel("Sim")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("nao")
            .setLabel("Não")
            .setStyle("DANGER"),
        )

        let uso = new MessageEmbed()
        .setDescription("**:x: Desculpe, mas não é assim que usar isto!** \n **use** \`!clear 1-99\`")
        .setColor("RED")
        .setFooter( interaction.guild.name, interaction.guild.iconURL({ dynamic: true}))

        let permissao = new MessageEmbed()
        .setDescription("**:x: Desculpe, você não tem permissão para usar isto!**")
        .setColor("RED")
        .setFooter( interaction.guild.name, interaction.guild.iconURL({ dynamic: true}))

        let permissaobot = new MessageEmbed()
        .setDescription("**:x: Desculpe, eu não tem permissão para usar isto!**")
        .setColor("RED")
        .setFooter( interaction.guild.name, interaction.guild.iconURL({ dynamic: true}))

        let confirmacao = new MessageEmbed()
        .setDescription(`**Tem certeza que vai apagar ${msg} mensagens do canal ${interaction.channel}?**`)
        .setColor("RED")
        .setFooter( interaction.guild.name, interaction.guild.iconURL({ dynamic: true}))

        let clear = new MessageEmbed()
        .setAuthor(`Canal limpo!`)
        .addField(`Staff:`, `${interaction.member}`)
        .addField(`Mensagens apagadas:`, `${msg}`)
        .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setColor("RED")

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.follwoUp({ embeds: [permissao]}).then( msg => 
            { setTimeout(() => { 
                msg.delete(); 
            }, 5000); 
        })
        if(!interaction.guild.me.permissions.has("ADMINISTRATOR")) return interaction.followUp({ embeds: [permissaobot]}).then( msg => 
            { setTimeout(() => { 
                msg.delete(); 
            }, 5000); 
        })
        if( parseInt(msg) > 99 || parseInt(msg) <= 0 ) return interaction.followUp({ embeds: [uso] }).then( msg => 
            { setTimeout(() => { 
                msg.delete(); 
            }, 5000); 
        })

        let enviado = await interaction.followUp({ embeds: [confirmacao], components: [clearbutton]})

        const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

        collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, apenas administradores podem limpar o chat`, ephemeral: true})
            if( interaction.customId === "sim") {
                enviado.delete();
                interaction.channel.send({embeds: [clear]}).then( msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000);
                })
               // interaction.channel.bulkDelete(parseInt(msg))
                interaction.channel.bulkDelete(msg, true);
            }
            if( interaction.customId === "nao") {
                enviado.edit({
                    content: "ação cancelada",
                    embeds: [],
                    components: []
                })
            }
        })
    },
};