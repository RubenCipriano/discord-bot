
module.exports.run = async(bot,message,args,config) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = config.active.get(message.guild.id);
    if(!fetched) return message.channel.send("Não existe Musicas no momento!").then(msg => msg.delete(1000)).catch();
    if(fetched.dispatcher.paused) return message.channel.send("A musica encontra-se pausada!").then(msg => msg.delete(1000)).catch();
    fetched.dispatcher.pause();
    message.channel.send(`Paramos ${fetched.queue[0].songTitle} com sucesso!`).then(msg => msg.delete(1000)).catch();
}

module.exports.help = {
  name: 'pause',
  description: "Comando para pausar musicas!",
  usage: `!pause`,
};
