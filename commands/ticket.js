const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    const categoryId = '875437733412233258' // 875437733412233258 = ────TICKETS────
    var userName = message.author.username
    var userDiscriminator = message.author.discriminator
    var alreadyTicket = false

    const ticketReason = args.slice(0).join(' ')
    if(!ticketReason) return message.channel.send(`<@${message.member.id}>, geef ook een reden op!`)

    message.guild.channels.cache.forEach(channel => {
        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
            alreadyTicket = true
            return message.reply('U hebt al een ticket!')
        }
    })

    if (alreadyTicket) return;
    var embed = new discord.MessageEmbed()
        .setTitle('Hello ' + message.author.username)
        .setFooter('Uw ticket wordt gemaakt.')
        .setColor('#7388da')

    const logEmbed = new discord.MessageEmbed()
        .setColor('#00d61d')
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Ticket gemaakt door:** ${message.author} (${message.author.id})
        **Reden:** ${ticketReason}`)

    client.channels.cache.find(ch => ch.name === "tickets").send(logEmbed)

    message.channel.send(embed)

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryId).then(
                (settedParent) => {
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Burger van Amstelveen'),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    })
                    settedParent.updateOverwrite(message.author.id,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        ADD_REACTIONS: true,
                        CREATE_INSTANT_INVITE: true,
                        READ_MESSAGE_HISTORY: true
                    })

                    var embedParent = new discord.MessageEmbed()
                        .setColor('#7388da')
                        .setTitle(`Hallo ${message.author.username}`)
                        .setDescription(`We proberen zo snel mogelijk te reageren. U kan al uw vraag/klacht/etc. stellen.`)

                    settedParent.send(`<@${message.member.id}>`)
                    settedParent.send(embedParent)
                }
            ).catch(err => {
                message.channel.send('Iets ging verkeerd, contacteer OK.')
            })
        }
    ).catch(err => {
        message.channel.send('Iets ging verkeerd, contacteer OK.')
    })
}

module.exports.help = {
    name: 'ticket',
    description: 'Een apart kanaal voor jou alleen en het support team',
    category: 'GENERAL'
}