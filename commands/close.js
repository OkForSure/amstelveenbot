const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    const categoryId = '875437733412233258' // 875437733412233258 = ────TICKETS────

    const tag = `<@${message.member.id}>`

    const closeReason = args.slice(0).join(' ')

    const logEmbed = new discord.MessageEmbed()
        .setColor('#fc3d03')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Ticket geclosed door:** ${message.author} (${message.author.id})
        **Reden:** ${closeReason}`)

        if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${tag} u hebt geen permissions om dit command te gebruiken.`)
        if(message.channel.parentID === categoryId){
            if(!closeReason) return message.channel.send(`<@${message.member.id}>, geef ook een reden op waarom je dit ticket wil sluiten!`)
            client.channels.cache.find(ch => ch.name === "tickets").send(logEmbed)
            message.channel.delete()
        } else {
            message.channel.send('Dit kan je alleen in een ticket doen.')
        }
}

module.exports.help = {
    name: 'close',
    description: 'Om een ticket te sluiten',
    category: 'STAFF'
}