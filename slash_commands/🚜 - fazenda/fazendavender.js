const db = require("quick.db")
const Discord = require("discord.js")
const c = require("../../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fazenda_vender`)
    .setDescription(`[🚜] » Venda suas verduras da fazenda`)
    .addStringOption(option => option.setName('verdura').setDescription('Digite qual verdura deseja vender [Cenoura] ou [Alface]'))
    .addStringOption(option => option.setName('quantidade').setDescription('Quantidade ou [all para vender tudo]')),
run: async (client, interaction) => {

const user = interaction.user

let semente = db.fetch(`sementes_${user.id}`)
if(semente === null) semente = 0;

let cenoura = db.fetch(`Cenouras_${user.id}`)
if(cenoura === null) cenoura = 0;

let alface = db.fetch(`Alfaces_${user.id}`)
if(alface === null) alface = 0;

let fazenda = db.fetch(`fazenda_${user.id}`)

let member = db.fetch(`kwanzas_${user.id}`);
if(member == null) member = 0;

let verdura = interaction.options.getString(`verdura`)
let valor = interaction.options.getString(`quantidade`)

let cc3 = new Discord.MessageEmbed()
.setColor(c.positive)
.setAuthor(user.tag, user.displayAvatarURL())
.setTitle("🚜 \`|\` Fazenda")
.setDescription(`<a:offline:760269178962968596> \`Voce precisar comprar uma fazenda por 100k de /fazenda comprar.\``)
.setFooter("Sistema de fazenda em desenvolvimento!")

if(fazenda === null || fazenda === "off")  return interaction.followUp({embeds: [cc3], ephemeral: true})

  const embed3 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setDescription(`<a:offline:760269178962968596> \`|\` **Numero Invalido.**`)

  if(String(valor) === "NaN") return interaction.followUp({embeds: [embed3]})


  let valor2 = valor * 2500
  let valor3 = valor * 1500

if (verdura === "Cenoura") {
  
    const embedcenoura = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Voce não tem [${valor}] cenouras.\``)
  
    const embedcenoura2 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Voce não pode vender [${valor}] cenouras.\``)

    const embedcenoura3 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Coloque uma quantidade valida de cenouras.\``)

    if(valor === null) return interaction.followUp({embeds: [embedcenoura3], ephemeral: true})
    if(valor < 1) return interaction.followUp({embeds: [embedcenoura2], ephemeral: true})
    if(cenoura < valor) return interaction.followUp({embeds: [embedcenoura], ephemeral: true})

  let vender2 = new Discord.MessageEmbed()
  .setColor(c.positive)
  .setTitle("🚜 - Fazenda")
  .setDescription(`**Voce vendeu:** \n🥕 \`[${valor}]\` **${verdura}**\n\n**👛 Valor recebido:** \`[${valor2}]\``)
  .setFooter("Sistema de fazenda em desenvolvimento!")

  db.subtract(`Cenouras_${interaction.user.id}`, valor);
  db.add(`kwanzas_${interaction.user.id}`, valor2);
  interaction.followUp({embeds: [vender2]});
}

if (verdura === "Alface") {

    const embedalface = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Voce não tem [${valor}] alfaces.\``)

    const embedalface2 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`<a:offline:760269178962968596> \`Voce não pode vender [${valor}] alfaces.\``)
    
    if(valor < 1) return interaction.followUp({embeds: [embedalface2], ephemeral: true})
    if(alface < valor) return interaction.followUp({embeds: [embedalface], ephemeral: true})

    let vender3 = new Discord.MessageEmbed()
    .setColor(c.positive)
    .setTitle("🚜 - Fazenda")
    .setDescription(`**Voce vendeu:** \n🥬 \`[${valor}]\` **${verdura}**\n\n**👛 Valor recebido:** \`[${valor3}]\``)
    .setFooter("Sistema de fazenda em desenvolvimento!")
  
    db.subtract(`Alfaces_${interaction.user.id}`, valor);
    db.add(`kwanzas_${interaction.user.id}`, valor3);
    interaction.followUp({embeds: [vender3]});
  }

  

   if(valor === 'all' || verdura === 'all'){
  
    let valorall = alface * 2500 + cenoura * 1500 

       const embedalface = new Discord.MessageEmbed()
       .setColor(c.positive)
       .setTitle("🚜 - Fazenda")
       .setDescription(`<a:offline:760269178962968596> \`Voce precisa ter pelo menos mais que [5] alface.\``)
   
       const embedcenoura = new Discord.MessageEmbed()
       .setColor(c.positive)
       .setTitle("🚜 - Fazenda")
       .setDescription(`<a:offline:760269178962968596> \`Voce precisa ter pelo menos mais que [5] cenouras.\``)
   
       if(alface < 5) return interaction.followUp({embeds: [embedalface], ephemeral: true})
       if(cenoura < 5) return interaction.followUp({embeds: [embedcenoura], ephemeral: true})
   
       let vender = new Discord.MessageEmbed()
       .setColor(c.positive)
       .setTitle("🚜 - Fazenda")
       .setDescription(`**Voce vendeu:** \n🥬 \`${alface}\` **Alfaces**\n🥕 \`${cenoura}\` **Cenouras**\n\n**👛 Valor recebido:** \`[${valorall}]\``)
       .setFooter("Sistema de fazenda em desenvolvimento!")
    
       interaction.followUp({embeds: [vender]});
       db.subtract(`Alfaces_${interaction.user.id}`, alface);
       db.subtract(`Cenouras_${interaction.user.id}`, cenoura);
       db.add(`kwanzas_${interaction.user.id}`, valorall);
   
     }
     



     let embedplant = new Discord.MessageEmbed()
     .setColor(c.positive)
     .setTitle("🚜 - Fazenda")
     .setDescription(`> **👩‍🌾 Bem vindo \`${interaction.user.tag}\` Aqui estao os preços de cada verdura.**\n\n🥬\`|\`**Alfaces:** \`1 = [R$2500]\`\n🥕\`|\`**Cenouras:** \`1 = [R$1500]\`\n\n > Dica: Para vender tudo na \`[quantidade ou na verdura]\` coloque \`all\``)
     .setThumbnail("https://cdn.discordapp.com/attachments/896888643044642858/907695389593985094/3375234.png")
     .setFooter("Sistema de fazenda em desenvolvimento!")

    if (valor === null || verdura === null) return interaction.followUp({ embeds: [embedplant] })

 
}
}