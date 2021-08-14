const discord = require('discord.js')
const botConfig = require('./botconfig.json')
const fs = require('fs')

const client = new discord.Client()
client.commands = new discord.Collection()

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)
    var jsFiles = files.filter(f => f.split('.').pop() === "js")
    if(jsFiles.length <= 0){
        console.log('No files!!!!!1!1!!!')
        return
    }
    jsFiles.forEach((f,i) => {
        var fileGet = require(`./commands/${f}`)
        console.log(`File ${f} is readydydy!!11!!`)

        client.commands.set(fileGet.help.name, fileGet)
    })
})

client.on("ready", async() => {
    const prefix = botConfig.prefix
    console.log(`${client.user.username} is readydydydy!! 1!!!!!1!!1!!!`)
    client.user.setActivity(`${prefix}help voor help`, {type: 'PLAYING'})

})

client.on('guildMemberAdd', async (newMember, message) => {
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'welkom')
    welcomeChannel.send(`> Welkom __<@${newMember.id}>__ in **Amstelveen**. We wensen u welkom en een fijne tijd tegemoet.`)

    newMember.roles.add('873856081540022282')
})

client.on('message', async message => {
    if(message.author.bot) return
    if(message.channel.type === "dm") return

    var prefix = botConfig.prefix
    var messageArray = message.content.split(' ')
    var command = messageArray[0]
    var arguments = messageArray.slice(1)
    var commands = client.commands.get(command.slice(prefix.length))
    if(commands) commands.run(client, message, arguments)
})

client.login(process.env.token)