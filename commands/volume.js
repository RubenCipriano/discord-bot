module.exports.run = async(bot,message,args,ops) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('No momento não existem musicas a tocar!').then(msg => msg.delete(10000)).catch;
    if(message.member.voiceChannel != message.guild.me.voiceChannel) return message.channel.send('Não estás conectado ao mesmo canal de audio!').then(msg => msg.delete(10000)).catch;
    if(isNaN(args[0]) || args[0] > 200000 || args[0] < 0) return message.channel.send('Indique um numero entre 0 e 200!').then(msg => msg.delete(10000)).catch;
    fetched.dispatcher.setVolume(args[0]/100);
    message.channel.send(`O volume da música: ${fetched.queue[0].songTitle} mudou para ${args[0]}`).then(msg => msg.delete(2000)).catch();
}


module.exports.help = {
  name: 'volume',
  description: "Define o volume do bot",
  usage: `!volume [Numero]`,
};
