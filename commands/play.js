const ytdl = require('ytdl-core');
const Discord = require('discord.js');

const PlaylistModel = require('../models/Playlist');

let PlayListSV = info = null;

module.exports.run = async(bot,message,args,ops) => {
      let server = {
        guild: message.guild.id,
    };

    if(!message.member.voiceChannel) return message.channel.send('Não se encontra em um canal de Audio!').then(msg => msg.delete(10000)).catch();
    if(!args[0]) PlayListSV = await PlaylistModel.findOne(server);
    if(!args[0] && !PlayListSV) return message.channel.send(`Não existe uma Playlist Default!`).then(msg => msg.delete(5000)).catch();
    if(!/[^a-zA-Z0-9]/.test(args[0]) && args[0]) {
      let commandFile = require("./search.js");
      commandFile.run(bot,message,args,ops);
    }
    else
    {
      if(args[0]){ 
        let val = await ytdl.validateURL(args[0]);
        if(!val) return message.channel.send('Introduza um url **válido**').then(msg => msg.delete(10000)).catch();
        info = await(ytdl.getInfo(args[0]));
      }
      let data = ops.active.get(message.guild.id) || {};
      if(!data.connection) data.connection = await message.member.voiceChannel.join();
      if(!data.queue) data.queue = [];
      data.guildID = message.guild.id;
      if(PlayListSV && !args[0]) {
        for(var i = 0; i < PlayListSV.songs.length; i++){
          data.queue.push({
            songTitle: PlayListSV.songs[i].songTitle,
            requester: PlayListSV.songs[i].requester,
            url: PlayListSV.songs[i].url,
            announceChannel: PlayListSV.songs[i].announceChannel
          });
        }
      }
      else {
        data.queue.push({
          songTitle: info.title,
          requester: message.author.tag,
          url: args[0],
          announceChannel: message.channel.id
        });
      }
      if(!data.dispatcher) {
        let embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Rub1Bot', message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Está sendo Reproduzido:`)
        .addField("Titulo:", `${data.queue[0].songTitle}`)
        .addField("A pedido de:", `${message.author.tag}`)
        .setFooter("Rub1 Bot",bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(30000)).catch();
        play(bot, ops, data);
      }
      else {
        let embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Rub1Bot', message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Foi adicionado uma Musica á queue`)
        .addField("Titulo:", `${info.title}`)
        .addField("A pedido de:", `${message.author.tag}`)
        .setFooter("Rub1 Bot",bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(30000)).catch();
      }
      ops.active.set(message.guild.id,data);
    }
}

async function play(bot, ops, data) {
  console.log('Song!\n' + data.queue[0].url);
  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
  console.log(data.dispatcher);
  data.dispatcher.guildID = data.guildID;
  data.dispatcher.on('end',function() {
      if(data.loop == true)
        play(bot,ops,data);
      else
      {
        if(data.loopqueue == true)
        finishLoop(bot,ops,this);
      else
        finish(bot,ops,this);
      }
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

module.exports.help = {
  name: 'play',
  description: "Corre uma musica do Youtube",
  usage: `!play <URL>`,
};
