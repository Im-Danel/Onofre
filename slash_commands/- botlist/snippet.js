const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
	data: new SlashCommandBuilder()
    .setName("snippet")
    .setDescription("[🤖] » Envie um snipper para o servidor")
    .addStringOption(option => option.setName('titulo').setDescription('Digite o título do seu snippet.').setRequired(true))
    .addStringOption(option => option.setName('linguagem').setDescription('Insira a qual linguagem seu código pertence. (HTML, CSS, Java, Javascript, PHP, Kotlin...)').setRequired(true))
    .addStringOption(option => option.setName('descrição').setDescription('Digite a descrição do seu snippet.').setRequired(true))
    .addStringOption(option => option.setName('code').setDescription('Insira o link do código. (sourceb.in...)').setRequired(true)),
	run: async (client, interaction) => {
		
    const titulo = interaction.options.getString('titulo')
    const linguagem = interaction.options.getString('linguagem')
    const descrição = interaction.options.getString('descrição')
    const code = interaction.options.getString('code')

    const embedd = new MessageEmbed()
    .setAuthor(`Snippet`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Código enviado por: ${interaction.member}`)
        .addField("Informações do snippet.", `
    \`📡\` Título: ${titulo}
    \`💎\` Descrição: ${descrição}
    \`💡\` Linguagem: ${linguagem}
    \`📪\` Código: ${code}`)

    await interaction.followUp({ embeds: [embedd] }).then((sentMessage) => {
        sentMessage.react("✅");
        sentMessage.react("❎");
    });

	},
};