const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
const active = new Map();
const config = {
    token: "NTUxODI1MTU0MTA4MjkzMTQw.XcdoHg.wTbfhS8TdoimAxsFmqsDBUpR7Ig",
    prefix: "!",
    id:"322089201455595530",
    active: active, 
};
let prefix = config.prefix;
fs.readdir("./commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split('.').pop() == 'js')
    if(jsfile.length <= 0){
        console.log('Não foram encontrados comandos .js!');
        return;
    }
    jsfile.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        let props = require(`./commands/${f}`);
        console.log(`${f} Carregado`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', async () => {
    console.log('Bot Criado com sucesso! Bot está a ser usado em: ' + bot.guilds.size + ' servidores!');
    bot.user.setActivity('Alpha 1.0', {type: 'Versão:'});
})

bot.on('message', (msg) => {
    if(msg.author == bot.author) return;
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run (bot,msg,args,config);
    if(cmd.startsWith(config.prefix)) msg.delete(1000);
})

bot.login(config.token);