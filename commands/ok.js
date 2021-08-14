const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    return message.channel.send(`ok, what's upp`)
}

module.exports.help = {
    name: 'ok',
    description: 'ok',
    category: 'FUN'
}