const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({disableEveryone: true});

// ### WELCOME ###
bot.on("guildMemberAdd", member => {
    let channelID = '809102144736985109'
    const channel = member.guild.channels.cache.get(channelID)
    channel.send(`Üdvözlünk a szerveren **<@${member.id}>**. Olvasd el a <#810102512723165194> kategória szobáit, és érezd jól magad.\nJó szórakozást kívánunk!`);
    const role = member.guild.roles.cache.find(r => r.id=== '812280399328968716')
    member.roles.add(role);
})

// ### DISCONNECT ###
bot.on("guildMemberRemove", member => {
    let channelID = '809102144736985109'
    const channel = member.guild.channels.cache.get(channelID)
    channel.send(`Köszi, hogy benéztél **<@${member.id}>**.\n Várunk vissza!`)
})


require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

// ### BAD WORD DELETE ###
bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

if(message.author.bot) return;

    let blacklist = ["bazd", "fasz", "kurva", "geci", "buzi"];
    
    for(let i = 0; i < blacklist.length; i++) {
        if(messageArray.includes(blacklist[i], 0)) {
            message.delete();
            message.reply("Ez tiltott szó!").then(r =>r.delete(5000));
            return;
        }
    }
})

bot.login(process.env.token);