module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS'))
        message.channel.send("Nincs jogosultságod a parancs használatához!");
    else {
        let member = message.guild.members.cache.get(args);
        if(member) {
        try {
            await member.kick();
            console.log('kirúgva!');
            message.channel.send(`${member}, sikeresen kirúgva!`)
        }
            catch(err) {
            console.log(err);
        }
    }
}
}

module.exports.config = {
    name: "kick",
    description: "felhasználó kirúgása",
    usage: "?kick",
    accessableby: "moderátor",
    aliases: []
}