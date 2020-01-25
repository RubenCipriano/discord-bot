module.exports.run = async(bot,message,args,config) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = config.active.get(message.guild.id);
      if(args[0] != undefined && fetched.queue[args[0]])
      {
            let songTitle = fetched.queue[args[0]].songTitle;
            fetched.queue.splice(args[0]);
            return message.channel.send("Removemos: " + songTitle + " da queue!").then(msg => msg.delete(10000)).catch;;
      }
      else
      {
          config.active.delete(config.active.guildID);
          let vc = message.guild.me.voiceChannel;
          if(vc) vc.leave();
          for(var i = 0; i < fetched.queue.lenght; i++) {
                fetched.queue.splice(0);
           }
           return message.channel.send("Removemos a Playlist Toda!").then(msg=> msg.delete(10000)).catch;
      }
}

module.exports.help = {
name: 'remove',
description:'Remove uma musica da queue',
usage:'!remove [Numero]'
};
