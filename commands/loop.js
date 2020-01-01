module.exports.run = async(bot,message,args,ops) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('No momento não existem musicas a tocar!').then(msg => msg.delete(10000)).catch;
    if(!fetched.loop || fetched.loop == false){
        fetched.loop = true;
        return message.channel.send(`✅ Foi ativado o loop da Musica: **${fetched.queue[0].songTitle}**`).then(msg => msg.delete(1000)).catch();
    } 
    else {
        fetched.loop = false;
        return message.channel.send(`❌ Foi desativado o loop da Musica: **${fetched.queue[0].songTitle}**`).then(msg => msg.delete(1000)).catch();
    }
}

module.exports.help = {
    name: 'loop',
    description: "Define o loop de uma musica",
    usage: `!loop`,
};
