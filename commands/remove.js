module.exports.run = async(bot,message,args,config) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
      if(args[0] != undefined)
      {
            let fetched = config.active.get(message.guild.id);
            let songTitle = fetched.queue[args[0]].songTitle;
            fetched.queue.splice(args[0]);
            return message.channel.send("Removemos: " + songTitle + " da queue!").then(msg => msg.delete(10000)).catch;;
      }
      else
      {
            for(var i = 0; i < feched.queue.lenght; i++) {
                let fetched = config.active.get(message.guild.id);
                fetched.queue.splice(0);   
            }
          return message.channel.send("Removemos a Playlist Toda!").then(msg=> msg.delete(10000)).catch;
      }
}

module.exports.help = {
name: 'remove',
description:'Remove uma musica da queue',
usage:'!remove <Numero>'
};
