const Discord = require("discord.js")
const botconfig = require("../botsettings.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['MANAGE_MESSAGES']) && !message.member.hasPermission('MANAGE_MESSAGES')) return;

        let mutedRole = message.guild.roles.cache.get('809100892258566154');
        let verifiedRole = message.guild.roles.cache.get('812280399328968716');
        if(mutedRole) {
            member.roles.remove(mutedRole);
            member.roles.add(verifiedRole);
            message.channel.send("Felhasználó sikeresen megkapta az unmute-t.");
        }
}

module.exports.config = {
    name: "unmute",
    description: "unmute",
    usage: "?unmute",
    accessableby: "moderátor",
    aliases: []
}