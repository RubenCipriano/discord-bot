const ytdl = require('ytdl-core');
module.exports.run = async(bot,message,args,ops) => {
        if(!message.member.voiceChannel) return message.channel.send('Não se encontra em um canal de Audio!').then(msg => msg.delete(10000)).catch();
        if(!args[0]) return message.channel.send('Indique um Video para reproduzir!').then(msg => msg.delete(10000)).catch();
        let val = await ytdl.validateURL(args[0]);
        if(!val) ('Introduza um url **válido**').then(msg => msg.delete(10000)).catch();
        let info = await(ytdl.getInfo(args[0])).catch(return message.channel.send("Ocorreu um erro ao tentar achar a Informação da Musica!"));
        let data = ops.active.get(message.guild.id) || {};
        if(!data.connection) data.connection = await message.member.voiceChannel.join();
        if(!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
          songTitle: info.title,
          requester: message.author.tag,
          url: args[0],
          announceChannel: message.channel.id
        });
        if(!data.dispatcher) play(bot, ops, data);
        else {
          message.channel.send(`Adicionado á Queue: ${info.title} | Pedido por: ${message.author.tag}`).then(msg => msg.delete(10000)).catch;
        }
        ops.active.set(message.guild.id,data);

    function play(bot, ops, data) {
      console.log('Song!\n' + data.queue[0].url);
      bot.channels.get(data.queue[0].announceChannel);
      if(ops.loop == false && ops.loopqueue == false)
          message.channel.send(`Está sendo reproduzido: ${data.queue[0].songTitle} | Pedido por: ${data.queue[0].requester}`).then(msg => msg.delete(10000)).catch;
      data.dispatcher = data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
      data.dispatcher.guildID = data.guildID;
      data.dispatcher.on('end',function() {
          if(ops.loop == true)
            play(bot,ops,data);
          else
            if(ops.loopqueue == true)
              finishLoop(bot,ops,this);
            else
              finish(bot,ops,this);
      });
    }

    function finish(bot, ops, dispatcher) {
      let fetched = ops.active.get(dispatcher.guildID);
      fetched.queue.shift();
      if(fetched.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetched);
        play(bot,ops,fetched);
      } else {
        ops.active.delete(dispatcher.guildID);
        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
        if(vc) vc.leave();
      }
    }

    function finishLoop(bot, ops, dispatcher) {
      let fetched = ops.active.get(dispatcher.guildID);
      console.log(fetched.queue);
      fetched.queue.push(fetched.queue[0]);
      fetched.queue.shift();
      if(fetched.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetched);
        play(bot,ops,fetched);
      } else {
        ops.active.delete(dispatcher.guildID);
        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
        if(vc) vc.leave();
      }
    }
}

module.exports.help = {
  name: 'play',
};
