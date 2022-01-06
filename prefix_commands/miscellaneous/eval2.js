const Discord = require('discord.js');
const { inspect } = require('util')

module.exports = {
    description: "Eval 2.",
    run: (client, message, args) => {

        let owner = ['337770791200489492', '337770791200489492' , '337770791200489492']

        if(!owner.includes(message.author.id)) return message.reply(`Apenas meus criadores podem usar esse comando.`)


				const code = args.join(" ")
				if(!code) return message.reply(`Você esqueceu do codigo.`)
					if(code.includes("config.token"))return message.reply({content:`Nice try kkkk.`})
                    if(code.includes("client.token"))return message.reply({content:`Nice try kkkk.`})
				

				try{
					const result = eval(code)
					let output = result

					if(typeof output !== 'string') {
						output = inspect(result)
					}
					const embed = new Discord.MessageEmbed()
					.setDescription(`Entrada:
					\`\`\`js
					${code}
					\`\`\`
					Saida:
					\`\`\`js
					${output}
					\`\`\`
					`).setColor(`#b026d6`)

					message.reply({embeds:[embed]})
				}catch (error){
						const embed = new Discord.MessageEmbed()
					.setDescription(`Ocorreu um erro:
					\`\`\`js
					${error}
					\`\`\`
					`).setColor(`#b026d6`)

					message.react('❌')
					message.reply({embeds:[embed]})
				}

    }
}