module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['MANAGE_MESSAGES']) && !message.member.hasPermission('MANAGE_MESSAGES')) return;

        let mutedRole = message.guild.roles.cache.get('809100892258566154');
        let verifiedRole = message.guild.roles.cache.get('812280399328968716');
        if(mutedRole) {
            member.roles.add(mutedRole);
            member.roles.remove(verifiedRole);
            message.channel.send("A felhasználó sikeresen lenémítva.");
        }
}

module.exports.config = {
    name: "mute",
    description: "felhasználó némítása",
    usage: "?mute",
    accessableby: "moderátor",
    aliases: []
}