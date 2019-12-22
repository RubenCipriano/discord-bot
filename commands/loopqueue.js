module.exports.run = async(bot,message,args,ops) => {
    if(ops.loopqueue == false)
    {
        ops.loopqueue = true;
        return message.channel.send(":white_check_mark: Foi ativado o Loop da Queue!").then(msg => msg.delete(1000)).catch();
    }
    if(ops.loopqueue == true)
    {
        ops.loopqueue = false;
        return message.channel.send("❌ Foi desativado o Loop da Queue!").then(msg => msg.delete(1000)).catch();
    }
}

module.exports.help = {
    name: 'loopqueue',
    description: "Define o loop da queue de Musicas",
  usage: `!loopqueue`,
};
