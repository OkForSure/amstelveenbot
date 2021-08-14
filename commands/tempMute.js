const discord = require('discord.js')
const ms = require('ms')

module.exports.run = async (client, message, args) => {

    const tag = `<@${message.author.id}>`
    
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`${tag}, u hebt geen permissions om dit command te gebruiken.`)
    if(!args[0]) return message.channel.send(`${tag}, specifier iemand om te muten.`)
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(`${tag}, ik heb geen permissions om dit te doen!`)

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!mutePerson) return message.channel.send(`${tag}, gebruiker niet gevonden`)
    if(mutePerson.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${tag}, u kan deze persoon niet muten.`)

    var muteRole = message.guild.roles.cache.get('874760820968550400')
    if(!muteRole) return message.channel.send(`${tag}, de mute role bestaat niet.`)

    const muteReason = args.slice(2).join(' ')

    var muteTime = args[1]

    if(!muteTime) return message.channel.send(`${tag}, u hebt geen tijd gegeven.`)

    if(!muteReason) return message.channel.send(`${tag}, u hebt geen reden gegeven.`)

    const logMuteEmbed = new discord.MessageEmbed()
        .setColor('#fc3d03')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gemuted:** ${mutePerson} (${mutePerson.id})
        **Gemuted door:** ${message.author}
        **Tijd:** ${muteTime}
        **Reden:** ${muteReason}`)

    client.channels.cache.find(ch => ch.name === "mute").send(logMuteEmbed)

    await(mutePerson.roles.add(muteRole.id))
    message.channel.send(`${tag}, ${mutePerson} is gemuted voor ${muteTime}!`)

    const logUnmuteEmbed = new discord.MessageEmbed()
        .setColor('#00d61d')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Geunmuted:** ${mutePerson} (${mutePerson.id})
        **Geunmted door:** ${message.author}
        **Gemutede tijd:** ${muteTime}`)

    setTimeout(() => {
        
        mutePerson.roles.remove(muteRole.id)
        client.channels.cache.find(ch => ch.name === "mute").send(logUnmuteEmbed)


    }, ms(muteTime))
}

module.exports.help = {
    name: 'tempmute',
    description: 'Om iemand te muten voor een bepaalde tijd',
    category: 'STAFF'
}