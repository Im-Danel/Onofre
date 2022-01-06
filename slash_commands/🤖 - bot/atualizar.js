const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName("atualizar")
    .setDescription("[🤖] » Recarregue os comandos de / em seu servidor"),
	run: async (client, interaction) => {

        if(interaction.user.id !== interaction.guild.ownerId) return interaction.channel.send(`⚔️ | Esse comando só pode ser usado pelo dono do servidor.`)
        await interaction.guild.commands.set([...client.slash_commands].map(x => x[1].data))

        return interaction.channel.send("✅ |  Comandos de Slash foram recarregados.")

	},
}; 