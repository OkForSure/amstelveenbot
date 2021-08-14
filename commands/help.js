const discord = require('discord.js')
const botConfig = require('../botconfig.json')

module.exports.run = async (client, message, args) => {
    
    var commandList = []
    var prefix = botConfig.prefix

    client.commands.forEach(command => {
        var constructor = {
            name: command.help.name,
            description: command.help.description,
            category: command.help.category
        }
        commandList.push(constructor)
    })
    var response = '> **COMMANDS**\n > \n > '
    var general = "**__ALGEMEEN COMMANDS__**\n  "
    var fun = "> \n > **__FUN COMMANDS__**\n "
    var staff = '> \n **__STAFF COMMANDS__** \n'
    var manager = '> \n > **__MANAGER COMMANDS__**\n '

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];
        if(command['category'] == "GENERAL"){
            general += `> ${prefix}${command['name']}    --    ${command['description']}\n`
        } else if(command['category'] == 'FUN'){
            fun += `> ${prefix}${command['name']}    --    ${command['description']}\n`
        } else if(command['category'] == 'STAFF'){
            staff += `> ${prefix}${command['name']}    --    ${command['description']}\n`
        } else if(command['category'] == 'MANAGER'){
            manager += `> ${prefix}${command['name']}    --    ${command['description']}\n`
        }
    }

    response += general
    response += fun
    response += staff
    response += manager

    message.author.send(response).then(() => {
        message.reply('Ik heb het in uw private messages (PM) gestuurd!')
    }).catch(() => {
        message.reply('Uw private message (PM) zijn gesloten, dus ik het niet sturen!')
    })

}

module.exports.help = {
    name: 'help',
    description: 'Een lijst van de commands',
    category: 'GENERAL'
}