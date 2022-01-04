const superagent = require("superagent");
const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

  module.exports = {
	data: new SlashCommandBuilder()
    .setName('tapa')
	.setDescription('[🎉] » De um tapa em algum membro')
    .addUserOption((option) => option.setName('user').setDescription('O membro que quer dar um tapa').setRequired(true)),
    run: async (client, interaction) => {

  const { body } = await superagent.get('https://nekos.life/api/v2/img/slap')
  
  const user = interaction.options.getUser('user')
  const pessoa = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

  if (!pessoa) return interaction.followUp({ content: `❌ | ${interaction.user} Você precisa mencionar alguém para bater`, ephemeral: true })

if (pessoa.id === interaction.user.id) return interaction.followUp({ content: `❌ | ${interaction.user} Você não pode se bater!`, ephemeral: true })

  const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("slap")
                .setStyle("SECONDARY")
                .setLabel("retribuir")
                .setEmoji(`🔁`)
                .setDisabled(false),
                )

  let tapa1 = new MessageEmbed()
    .setTitle(` Tapa ✨`)
    .setDescription(`😤 👋 ${interaction.user} Deu um Tapa em ${pessoa}!`)
    .setImage(body.url)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(user.displayAvatarURL())
    .setFooter("👋 Tapa")

    const { body } = await superagent.get('https://nekos.life/api/v2/img/slap')
    let tapa = new MessageEmbed()
    .setTitle(`😤 👋 Tapa ✨`)
    .setDescription(`💓${pessoa} retribuiu o Tapa de ${interaction.user}!`)
    .setColor("RED")
    .setImage(body.url)
    .setThumbnail(interaction.user.displayAvatarURL())
    .setFooter("👋 Tapa")

    const me = await interaction.channel.send({embeds: [tapa1], components: [row], fetchReply: true})
    const collector = interaction.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 10 * 6000 })

    collector.on('collect', interaction => {
        if( interaction.user.id !== pessoa.id ) return interaction.reply({ content: `❌ apenas o ${pessoa} tem permissão de reagir no botão`, ephemeral: true })
            if (interaction.customId === 'slap') {
            me.edit({
            embeds: [tapa],
            components: []
            })
        };
    });
    }
}