const Discord = require('discord.js');
const search = require('yt-search');
module.exports.run = async(bot,message,args,config) => {
    search(args.join(" "),function(err,res){
        if(err) return message.channel.send('Ocorreu um erro por favor tente novamente').then(msg => msg.delete(1000)).catch();
        let videos = res.videos.slice(0,10);
        let resp = '';
        for(var i in videos){
            resp += `**|${parseInt(i)+1}|:** \`${videos[i].title}\`\n`;
        }
       resp += `\n***Escolha um numero entre*** \`1-${videos.length}\``;
       message.channel.send(resp).then(msg => msg.delete(5000)).catch();
       const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
       const collector = message.channel.createMessageCollector(filter, { time: 5000 });
       collector.videos = videos;
       collector.once('collect', function(m) {
           let commandFile = require("./play.js");
           commandFile.run(bot,message,[this.videos[parseInt(m.content)-1].url], config);
           m.delete(1000);
       });
    });
}

module.exports.help = {
  name: 'search',
  description: "Comando para pesquisar musicas!",
  usage: `!search <Musica>`,
};