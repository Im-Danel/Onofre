const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
        require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('[🤖] » Obtenha informações sobre o bot'),
    run: async (client, interaction) => {

        const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB";
        const uptime = moment.duration(client.uptime).format(" D [Dias], H [Horas], m [Mins], s [Segs]");

            let dono = client.users.cache.get("337770791200489492").tag
            let embed = new MessageEmbed()
            .setTitle(`Onofre - BotInfo`)
            .setDescription(`**<:DE_Bot:801118988558008350> Estatísticas**
        \> <a:discgif:757652969066856608> Uptime: ${uptime}
        \> <a:ping:760269095869743124> Ping: ${client.ws.ping}
        \> <:ram:861385417131163678> RAM: ${memory}`)
                .addFields(
                {
                    name: "**🏅 Agradecimentos:**",
                    value: `• Agradeço ao **<:js:770099332371578921> ${dono}** por me desenvolver\n• Agradeço a todos **<:friend:861381869630914621> ${client.users.cache.size}** usuários\n• A Todos **🗺️ ${client.guilds.cache.size}** servidores que me adicionaram\n• A Todos que usaram meus comandos **🗺️ ${client.commands.length}** vezes.`})
                .addFields(
                {
                    name: "**<:status:808397847484825670> Meu servidor de Suporte e Convite do Bot**",
                    value: "[Convite Do Bot](discord.gg/gaqWzp8tWS)\n[Convite Do Servidor](discord.gg/gaqWzp8tWS)"})
                .addFields(
                {
                    name: "**<a:person:760646246955483187> Emojis Customizados:**",
                    value: "Para exibir emojis personalizados, dê ao canal permissão 'Usar emojis externos' para o cargo '@everyone'"})
            .setTimestamp()
            .setColor('00D6FF')
            interaction.followUp({ embeds: [embed ]})
        }
}