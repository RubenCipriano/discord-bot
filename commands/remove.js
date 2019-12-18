module.exports.run = async(bot,message,args,config) => {
      if(args[0] != undefined && args[0] >= 0)
      {
            let fetched = config.active.get(message.guild.id);
            let songTitle = fetched.queue[args[0]].songTitle;
            fetched.queue.splice(args[0]);
            return message.channel.send("Removemos: " + songTitle + " da queue!").then(msg => msg.delete(10000)).catch;;
      }
      return message.channel.send("Enviaste um valor não válido!").then(msg => msg.delete(10000)).catch;;
}

module.exports.help = {
  name: 'remove',
};
