module.exports.run = async(bot,message,args,ops) => {
    if(ops.loop == false)
    {
        ops.loop = true;
        return message.channel.send(":white_check_mark: Foi ativado o Loop!");
    }
    if(ops.loop == true)
    {
        ops.loop = false;
        return message.channel.send("❌ Foi desativado o Loop!");
    }
}

module.exports.help = {
    name: 'loop',
};
