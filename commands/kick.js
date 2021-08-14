const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    const { member, mentions } = message

    const tag = `<@${member.id}>`
    
    if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')){
        const target = mentions.users.first()
        const kickReason = args.slice(1).join(' ')
        if (target) {
            if(!kickReason) return message.channel.send(`${tag}, geef een reden op!`)

            const targetMember = message.guild.members.cache.get(target.id)
            message.channel.send(`${tag}, ${targetMember} is gekicked!`)
            targetMember.kick()

            const logEmbed = new discord.MessageEmbed()
                .setColor('#fc3d03')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Gekicked:** ${targetMember} (${targetMember.id})
                **Gekicked door:** ${message.author}
                **Reden:** ${kickReason}`)

            client.channels.cache.find(ch => ch.name === "kicks").send(logEmbed)

        } else {
            message.channel.send(`${tag}, specifier iemand om te kicken.`)
        }
    } else {
        message.channel.send(`${tag} u hebt geen permissions om dit command te gebruiken.`)
    }
}

module.exports.help = {
    name: 'kick',
    description: 'Om iemand te kicken van de server',
    category: 'STAFF'
}