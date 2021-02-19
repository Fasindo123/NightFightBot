module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) 
        message.channel.send("Nincs jogosultságod hozzá!");
    else {
        let bannedMember = await message.guild.members.ban(args);
        if(bannedMember){

        try {
            console.log(bannedMember.tag + " kitiltva.");
            message.channel.send (`${bannedMember} sikeresen kitiltva!`)
        }
            catch(err) {
            console.log(err);
        }
    }
}
}

module.exports.config = {
    name: "ban",
    description: "felhasználó kitiltása",
    usage: "?ban",
    accessableby: "moderátor",
    aliases: []
}
