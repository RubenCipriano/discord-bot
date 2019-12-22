module.exports.run = async(bot,message,args,config) => {
    let fetched = config.active.get(message.guild.id);
    if(!fetched) return message.channel.send("Não existe Musicas no momento!").then(msg => msg.delete(1000)).catch();
    if(!fetched.dispatcher.paused) return message.channel.send("A musica encontra-se em resumo!").then(msg => msg.delete(1000)).catch();
    fetched.dispatcher.resume();
    message.channel.send(`Retomamos ${fetched.queue[0].songTitle} com sucesso!`).then(msg => msg.delete(1000)).catch();
}

module.exports.help = {
  name: 'resume',
  description: "Comando para retomar a musica!",
  usage: `!resume`,
};