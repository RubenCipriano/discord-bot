module.exports.run = async(bot,message,args,ops) => {
    if(ops.loopqueue == false)
    {
        ops.loopqueue = true;
        return message.channel.send(":white_check_mark: Foi ativado o Loop!");
    }
    if(ops.loopqueue == true)
    {
        ops.loopqueue = false;
        return message.channel.send("❌ Foi desativado o Loop!");
    }
}

module.exports.help = {
    name: 'loopqueue',
};
