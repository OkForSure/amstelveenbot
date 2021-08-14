const discord = require('discord.js')
const fs = require('fs')
const { stringify } = require('querystring')
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"))

module.exports.run = async (client, message, args) => {

    const tag = `<@${message.member.id}>`
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${tag} u hebt geen permissions om dit command te gebruiken.`)

    if(!args[0]) return message.channel.send(`${tag} geen gebruik gegeven.`)

    if(!args[1]) return message.channel.send(`${tag}, geen reden gegeven.`)

    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${tag}, ik heb geen permissions.`)

    const warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

    const warnReason = args.slice(1).join(" ")  

    if(!warnUser)return message.channel.send(`${tag}, ik kan de gebruiker niet vinden.`)
    if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${tag}, u kan deze gebruiker niet warnen.`)

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err)
    })

    message.channel.send(`${tag}, **${warnUser}** is gewarnt en heeft momenteel **${warns[warnUser.id].warns}** met de reden **${warnReason}**.`)
    const logEmbed = new discord.MessageEmbed()
            .setColor('#fc3d03')
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Gewarnt:** ${warnUser} (${warnUser.id})
            **Warning door:** ${message.author}
            **Reden:** ${warnReason}`)
            .addField("**Aantal warns**", warns[warnUser.id].warns)

            
    client.channels.cache.find(ch => ch.name === "warns").send(logEmbed)

    if(warns[warnUser.id].warns == 3){
        warnUser.kick()
        const logEmbed = new discord.MessageEmbed()
                .setColor('#fc3d03')
                .setFooter(message.member.displayName)
                .setTimestamp()
                .setDescription(`**Gekicked:** ${warnUser} (${warnUser.id})
                **Gekicked door:** <@${message.guild.me.id}>
                **Reden:** 3 warns`)

        client.channels.cache.find(ch => ch.name === "kicks").send(logEmbed)
    }

}

module.exports.help = {
    name: 'warn',
    description: 'ok',
    category: 'FUN'
}