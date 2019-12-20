
const Discord = require('discord.js');

module.exports.run = async(bot,message,args,config) => {
    if(args[0] == "help") return message.channel.send(`Apenas faça ${config.prefix}help`);
    if(args[0]) {
        let command = args[0];
        if(bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setAuthor('Rub1Bot', message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription(`O Prefixo do bot é: ${config.prefix}\n\n**Command:** ${command.help.name}\n**Description:** ${command.help.description || "Não definido"}\n**Usage:** ${command.help.usage || "Não definido"}\n **Acessible by:** ${command.help.acessibleby || "Membros"}`)
            message.channel.send(SHembed).then(m => m.delete(10000)).catch();
        }
        
    }
    if(!args[0]) {
        let embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Rub1Bot', message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`Todos os comandos estão listados em baixo!\nO prefixo do bot é ${config.prefix}`)
        .addField("Comandos:", "`` clear `` `` defaultrole `` `` eval `` `` help `` `` leave `` `` loop `` `` loopqueue `` `` ping `` `` play `` `` queue `` `` reload `` `` remove `` `` volume ``")
        .setFooter("Rub1 Bot",bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000)).catch();
        message.author.send(embed);
    }
}

module.exports.help = {
    name: 'help',
    description: "Comando de Ajuda ao Utilizador!",
    usage: `!help [commando]`,
};
