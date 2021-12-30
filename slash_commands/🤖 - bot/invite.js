const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("[🤖] » Obtenha o convite do bot"),
	run: async (client, interaction) => {

        const Invite = new MessageEmbed()
        .setTitle("Invite Me!")
        .setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe 👋")
         .setColor("PINK")
         .setThumbnail(client.user.displayAvatarURL())

      let row = new MessageActionRow().addComponents(
        new MessageButton()
          .setURL("Bot invite link")
          .setLabel("Invite Me")
          .setStyle("LINK"),

        new MessageButton()
        .setURL("server invite link")
          .setLabel("Support Server")
          .setStyle("LINK"),

      );
      interaction.followUp({ embeds: [Invite], components: [row] });

	},
};