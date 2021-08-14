const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    const { member, mentions } = message

    const tag = `<@${member.id}>`
    
    if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')){
        const target = mentions.users.first()
        const banReason = args.slice(1).join(' ')
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban({reason: banReason})
            message.channel.send(`${tag}, u hebt succesvol ${targetMember} gebanned.`)

            const logEmbed = new discord.MessageEmbed()
                .setColor('#fc3d03')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Gebanned:** ${targetMember} (${targetMember.id})
                **Gebanned door:** ${message.author}
                **Reden:** ${banReason}`)

            client.channels.cache.find(ch => ch.name === "bans").send(logEmbed)

        } else {
            message.channel.send(`${tag}, gebruiker niet gevonden.`)
        }
    } else {
        message.channel.send(`${tag} u hebt geen permissions om dit command te gebruiken.`)
    }
}

module.exports.help = {
    name: 'ban',
    description: 'Om iemand te bannem',
    category: 'MANAGER'
}