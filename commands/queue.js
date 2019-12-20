module.exports.run = async(bot,message,args,ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('No momento não existem musicas a tocar!').then(msg => msg.delete(10000)).catch;
    let queue = fetched.queue;
    let np = queue[0];
    let msg = `__**Reproduzindo no Momento:**__\n**${np.songTitle}** -- **Pedido Por:** * ${np.requester}*\n\n__**Queue:**__\n`;
    for(var i = 1; i < queue.length; i++) {
        msg+= `${i}. **${queue[i].songTitle}** -- **Pedido Por:** *${queue[i].requester}* \n`;
    }
    message.channel.send(msg).then(msg => msg.delete(10000)).catch;
}


module.exports.help = {
  name: 'queue',
  description: "Corre a queue das musicas",
  usage: `!queue`,
};