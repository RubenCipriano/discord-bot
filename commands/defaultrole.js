module.exports.run = async(bot,message,args,config) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if(args[0])
            config.defaultRole = args[0];                 
        else
            message.channel.send("A role Default é: " + config.defaultRole).then(msg => msg.delete(1000)).catch();
  }
}

module.exports.help = {
  name: 'defaultrole',
  description: "Define um cargo default a ser usado quando alguem entra",
  usage: `!defaultrole [NewRole]`,
};