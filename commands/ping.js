const discord = require('discord.js');

module.exports.run = async(bot,message,args,config) => {
    console.log("Comando Ping Selecionado!");
    const msg = await message.channel.send(`🏓 Pinging...`)
    msg.edit(`🏓 A latencia entre Bot - Server é de: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\n🏓 A latencia da API é de ${Math.floor(bot.ping)}ms`);
    msg.delete(10000);
}

module.exports.help = {
    name: 'ping',
    description:'Comando Ping para ver a latencia entre Bot-Server e API',
    usage:'<prefix>**ping**'
};