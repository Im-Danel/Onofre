const { Client, Intents, Collection } = require("discord.js"),
{ token, prefix, color, ownerId } = require("./config.json"),
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES ] })

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId }

for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client);

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const emoteRegex = /:\w+:/gi;
    if (emoteRegex.test(message.content)) {

        const emote = client.emojis.cache.find(emote => emote.name === message.content.match(emoteRegex)[0].replace(/:/g, ''));
        if (!emote) return;

        if (message.guild.emojis.cache.has(emote.id) && !emote.animated) {
            return;
        }

        if (!message.guild.me.permissions.has('MANAGE_WEBHOOKS') || !message.guild.me.permissions.has('MANAGE_MESSAGES')) return;

        message.delete();
        const { channel } = message;
        const hooks = await channel.fetchWebhooks();

        try {
            const [ name, avatar ] = [ message.member.displayName, message.member.displayAvatarURL() ];
            let myHook = hooks.find(h => h.owner?.id === message.guild.me.id);
            if (!myHook) {
                myHook = await channel.createWebhook(name, {
                    avatar
                });
            }

            await myHook.edit(
                {
                    name, avatar
                });
            myHook.send(message.content.replace(emoteRegex, `${emote}`), { disableMentions: 'all' });
        }

        catch (err) {
            console.log(err.stack);
        }
            
            
    }
});

client.login(token)