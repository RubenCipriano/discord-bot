const {inspect} = require('util');

module.exports.run = async(bot,message,args,config) => {
    if(message.author.id != config.id) return;
    let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled)).then(msg => msg.delete(25000)).catch;
    }
    catch (error) {
      console.error(error);
      message.reply('there was an error during evaluation.').then(msg => msg.delete(2000)).catch;
    }
}

module.exports.help = {
    name: 'eval',
};