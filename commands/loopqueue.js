module.exports.run = async(bot,message,args,ops) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.channel.send('No momento não existem musicas a tocar!').then(msg => msg.delete(10000)).catch;
    if(!fetched.loop || fetched.loop == false){
        fetched.loopqueue = true;
        return message.channel.send(`✅ Foi ativado o loop da Queue`).then(msg => msg.delete(1000)).catch();
    } 
    else {
        fetched.loopqueue = false;
        return message.channel.send(`❌ Foi desativado o loop da Queue`).then(msg => msg.delete(1000)).catch();
    }
}

module.exports.help = {
    name: 'loopqueue',
    description: "Define o loop da queue de Musicas",
  usage: `!loopqueue`,
};
