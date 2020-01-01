const fs = require('fs');
const ytdl = require('ytdl-core');
let ServerPlaylist = require('../playlists.json');
module.exports.run = async(bot,message,args,ops) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('No momento não existem musicas a tocar!').then(msg => msg.delete(10000)).catch;
    let queue = fetched.queue;
    ServerPlaylist[message.guild.id] = {
        Songs: new Array(), 
    };
    for(var i = 0; i < queue.length; i++) {
        ServerPlaylist[message.guild.id].Songs.push({
            songTitle: queue[i].songTitle,
            requester: queue[i].requester,
            url: queue[i].url,
            announceChannel: queue[i].announceChannel
        });
    }
    fs.writeFile("./playlists.json", JSON.stringify(ServerPlaylist), (err) => {
        if(err)console.log(err);
    });
    return message.channel.send(`Alteramos a Playlist definida por Default!`).then(msg => msg.delete(5000)).catch();
}

module.exports.help = {
  name: 'playlist',
  description: "Comando para mostrar playlists!",
  usage: `!playlist`,
};
