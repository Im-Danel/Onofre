const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

  module.exports = {
	data: new SlashCommandBuilder()
    .setName('atividades')
	.setDescription('[🎉] » Escolha um jogo para se divertir')
	.addStringOption(option =>
		option.setName('jogo')
			.setDescription('Escolha o jogo que quer')
			.setRequired(true)
			.addChoice('Youtube', '755600276941176913')
			.addChoice('Poker', '755827207812677713')
      .addChoice('Schach', '832012774040141894')
      .addChoice('Betrayal.io', '773336526917861400')
			.addChoice('Fischen', '814288819477020702')),
    run: async (client, interaction) => {

      const escolha = interaction.options.get('jogo').value;
      const channel = interaction.member.voice.channel;

      if (!channel) {
        interaction.followUp(':no_entry: Para iniciar uma nova sessão, você deve estar em um canal de voz!');
        return;
      } channel.createInvite({
        maxUses: 0,
        maxAge: 86400,
        targetApplication: escolha, // Escolha Jogo
        targetType: 2,
        temporary: false
      }).then(content => {

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(content.url)
                .setLabel('Jogar')
                .setStyle('LINK'),
        );

        interaction.followUp({  content: 'Clique no botão para jogar', components: [row] })});
    },
}