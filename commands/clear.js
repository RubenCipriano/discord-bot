
module.exports.run = async(bot,message,args,config) => {
      if (message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.fetchMessages()
          .then(function(list){
                message.channel.bulkDelete(list).catch();
            }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
    }
}

module.exports.help = {
    name: 'clear',
};
