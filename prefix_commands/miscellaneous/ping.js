module.exports = {
    description: "Obtenha o ping do websocket da mensagem.",
    run: (client, message) => {
        return message.channel.send(`🏓 | Ping é \`${client.ws.ping}\` ms.`)
    }
}