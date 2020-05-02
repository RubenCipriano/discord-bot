const PlaylistModel = require('../models/Playlist');

module.exports.run = async(bot,message,args,config) => {
    let server = {
        guild: message.guild.id,
    };

    if (message.member.hasPermission("MANAGE_MESSAGES") && config.active.get(message.guild.id) != null) {

        let data = {
            guild: message.guild.id,
            songs: config.active.get(message.guild.id).queue
        }

        let serverPlaylist = await PlaylistModel.findOne(server);

        if(serverPlaylist == null)
        {
            const Playlist = new PlaylistModel(data);

            Playlist.save((err) => {
                if(err)
                    console.log(err);
                else
                    console.log("Created Playlist");
            });
        }
        else
        {
            serverPlaylist.updateOne(data, (err) => {
                if(err)
                    console.log(err);
                else
                    console.log("Updated Playlist");
            });
            serverPlaylist.save();
        }
    } else {
        let queue = await PlaylistModel.findOne(server);
        let msg = `__**Playlist Default:**__\n`;
        for(var i = 0; i < queue.songs.length; i++) {
            msg += `**${queue.songs[i].songTitle}** \n`;
        }
        message.channel.send(msg).then(msg => msg.delete(10000)).catch;
    }
}



module.exports.help = {
    name: 'playlist',
    description: "Comando de Apagar as mensagens!",
    usage: `!playlist`,
};