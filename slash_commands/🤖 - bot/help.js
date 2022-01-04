const { MessageActionRow, MessageSelectMenu, MessageEmbed} = require('discord.js')
const Discord = require('discord.js')
module.exports = {
  name: '',
  aliases: '',
  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Veja meus comandos')
    .setDescription(`Ola ${message.author}, para ver dos meus comando utilize o painel abaixo`)
    .setColor('RANDOM')
    .setFooter('☁️| 2022 ©️ Onofre, A Lagartixa')

    const embed2 = new Discord.MessageEmbed()
    .setTitle('Moderação')
    .setDescription(`Escreva seus comando de moderação`)
    .setColor('RANDOM')
    .setFooter('☁️| 2022 ©️ Onofre, A Lagartixa')

    const embed3 = new Discord.MessageEmbed()
    .setTitle('Diversão')
    .setDescription(`escreva seus comandos de diversão`)
    .setColor('RANDOM')
    .setFooter('☁️| 2022 ©️ Onofre, A Lagartixa')

    const embed4 = new Discord.MessageEmbed()
    .setTitle('FiveM')
    .setDescription(`Escreva seus outros comandos aqui`)
    .setColor('RANDOM')
    .setFooter('☁️| 2022 ©️ Onofre, A Lagartixa')

    const row = new Discord.MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('1')
      .setPlaceholder('Clique aqui!')
      .addOptions([
        {
          label: 'Painel Inicial',
          
          emoji: '🏠',
          value: '1',

        },

        {
          label: 'Moderação',
          
          emoji: '🔨',
          value: '2',
        }, 
        {
        label: 'Diversão',
        emoji: '🤣',
        value: '3',
        },
        {
          label: 'Outros',
          emoji: '❓',
          value: '4',

        }
      ])
    )
    message.channel.send({ embeds: [embed], components: [row]})
.then(msg=>{
			const filtro = (interaction) => 
            interaction.isSelectMenu()
      
          const coletor = msg.createMessageComponentCollector({
            filtro
          });
      coletor.on('collect', async(collected)=>{
				 let ticket = collected.values[0]
            collected.deferUpdate()

		if(ticket === '1'){
		    msg.edit({embeds: [embed]})
		}
		if(ticket === '2'){
			msg.edit({embeds: [embed2]})
		}
        if(ticket === '3'){
            msg.edit({embeds: [embed3]})
        }
        if(ticket === '4'){
            msg.edit({embeds: [embed4]})
        }
			})
		})
	}
}