module.exports.run = async(bot,message,args,ops) => {
    if(ops.loop == false)
    {
        ops.loop = true;
        return message.channel.send(":white_check_mark: Foi ativado o Loop!").then(msg => msg.delete(10000)).catch;;
    }
    if(ops.loop == true)
    {
        ops.loop = false;
        return message.channel.send("❌ Foi desativado o Loop!").then(msg => msg.delete(10000)).catch;;
    }
}

module.exports.help = {
    name: 'loop',
};
