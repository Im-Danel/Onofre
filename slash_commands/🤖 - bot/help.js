const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "Mostra a lista de comandos"
    ),
	run: async (client, interaction) => {
    try {
      const commands = client.slash_commands; 
      //const commands = client.slashCommands.get(interaction.commandName);

      const commandList = commands.map((command) => {
        const infos = `\n/${command.data.name} - ${command.data.description}`;

        const listafiltrada1 = commandList.filter((state) => {
          //return command.data.name == '[🧬]'
          return infos.includes("[🧬]")
        })

        console.log('oi')
        
        console.log(listafiltrada1)
        return infos;
      });

      await  interaction.followUp(`Lista completa dos comandos: \n${commandList}`);
    } catch (error) {
      await  interaction.followUp({
        content: "Algo de errado aconteceu",
        ephemeral: true,
      });
      throw new Error(error.message);
    }
  },
};