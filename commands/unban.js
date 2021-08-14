const discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const tag = `<@${message.member.id}>`

    const member = args[0]

    if (!message.member.hasPermission('ADMINISTRATOR') || !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${tag} u hebt geen permissions om dit command te gebruiken.`)

    if(!member) {
        return message.channel.send(`${tag}, stuur een geldig ID.`)
    }

    try {
        message.guild.fetchBans().then(bans => {
            message.guild.members.unban(member)
        })
        await message.channel.send(`${member} is geunbanned!`)

        const logEmbed = new discord.MessageEmbed()
                .setColor('#00d61d')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Geunbanned:** <@${member}> (${member})
                **Geunbanned door:** ${message.author}`)

        await client.channels.cache.find(ch => ch.name === "bans").send(logEmbed)

    } catch(e) {
        return message.channel.send(`ERROR: ${e}`)
    }
}

module.exports.help = {
    name: 'unban',
    description: 'Om iemand te unbannen',
    category: 'MANAGER'
}