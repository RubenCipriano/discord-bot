const discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(bot,message,args,config) => {
    console.log("Comando Reload Selecionado!");
    if(message.author.id != config.id) return message.channel.send('Não tens as permissões necessárias').then(msg => {msg.delete(10000)}).catch;
    fs.readdir("./commands", (err,files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() == 'js')
        if(jsfile.length <= 0){
            console.log('Não foram encontrados comandos .js!');
            return;
        }
        jsfile.forEach((f, i) => {
            delete require.cache[require.resolve(`./${f}`)];
            let props = require(`./${f}`);
            console.log(`${f} Carregado`);
            bot.commands.set(props.help.name, props);
        });
    })
    config.active.delete();
    return;
}

module.exports.help = {
    name: 'reload',
    description:'Reseta todos os comandos disponiveis para o Bot',
    usage: `!reload`,
};