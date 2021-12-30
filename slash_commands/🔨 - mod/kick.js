const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("[🔨] » Permite ao administrador ou proprietário de kickar o membro.")
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer kickar').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Motivo para kickar o membro').setRequired(true)),
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.followUp({ content: "Você não tem permissões suficientes para usar este comando.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.followUp("😅 | Incapaz de obter detalhes do membro.");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.followUp("😅 | Não consigo banir o membro");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.followUp('Cargo do membro é maior ou igual ao meu.')
        
        const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}** Foi kickado  \nMotivo: \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Kick Membro")
        .setTimestamp()

        await member.user.send(`Você foi kickado do servidor**\`${interaction.guild.name}\`\n** Motivo: \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.followUp({ embeds: [ embed ]})

    },
    
};
