const Discord = require('discord.js');

const bot = new Discord.Client();

const fs = require('fs');

const mongoose = require('mongoose');

const RoleDb = require('./models/Role');

bot.commands = new Discord.Collection();

const active = new Map();

const Role = new Map();

const config = {
    prefix: "-",
    id:"322089201455595530",
    active: active, 
    defaultRole: Role,
};

let prefix = config.prefix;

mongoose.connect('mongodb+srv://rubi:r2yvxF7FDaLT0xic@discord-bot-92dui.mongodb.net/discord', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("*Connected to MongoDB*");
});

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
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: `${prefix}help in ${bot.guilds.size} server(s)`,
            type: "LISTENING"
        }
    });
})

bot.on("guildCreate", guild => {
    console.log('Bot Adicionado em um servidor! Bot está a ser usado em: ' + bot.guilds.size + ' servidores!');
    bot.user.setActivity('Alpha 1.0', {type: 'Versão:'});
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: `${prefix}help in ${bot.guilds.size} server(s)`,
            type: "LISTENING"
        }
    });
})
bot.on("guildDelete", guild => {
    console.log('Bot Removido de um servidor! Bot está a ser usado em: ' + bot.guilds.size + ' servidores!');
    bot.user.setActivity('Alpha 1.0', {type: 'Versão:'});
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: `!help in ${bot.guilds.size} server(s)`,
            type: "LISTENING"
        }
    });
})
bot.on("guildMemberAdd", (member) => {
    let role = config.defaultRole.get(member.guild.id);
    if(!role) return;
    else member.addRole(role.defaultRole);
})
bot.on('message', (msg) => {
    start(msg);
    if(msg.author == bot.author) return;
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd.startsWith(config.prefix))
    {
        let commandFile = bot.commands.get(cmd.slice(prefix.length));
        console.log("Command " + cmd.slice(prefix.length) + " executed!");
        if(commandFile) commandFile.run (bot,msg,args,config);
    }
})

async function start(msg) {
    let data = config.defaultRole.get(msg.guild.id) || {};
    if(!data.defaultRole) {
        let defaultRole = await RoleDb.findOne({guild: msg.guild.id});
        if(defaultRole != null)
        {
            data.defaultRole = msg.guild.roles.find(x => x.name == defaultRole.role);
            config.defaultRole.set(msg.guild.id,data);
            console.log(config.defaultRole.get(msg.guild.id).defaultRole);
        }
    }
}

bot.login(process.env.Token);

