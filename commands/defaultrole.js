const Discord = require('discord.js');
const RoleDb = require('../models/Role');

module.exports.run = async(bot,message,args,ops) => {
    let server = {
      guild: message.guild.id,
  };

  if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Não tens permissão para fazer isto!`).then(msg => msg.delete(5000)).catch();
  let data = ops.defaultRole.get(message.guild.id) || {};
  args = args.join(" ");
  if(!data.defaultRole && !args) return message.channel.send(`Não existe uma Role Default Neste Servidor!`).then(m => m.delete(10000)).catch();
  if(!args) {
    let embed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setAuthor('Rub1Bot', message.guild.iconURL)
      .setThumbnail(bot.user.displayAvatarURL)
      .setTimestamp()
      .setDescription(`A Role Definida por Default`)
      .addField("Role:", `${data.defaultRole}`)
      .addField("A pedido de:", `${message.author.tag}`)
      .setFooter("Rub1 Bot",bot.user.displayAvatarURL)
      return message.channel.send(embed).then(m => m.delete(30000)).catch();
  }
  if(args && message.author.id == ops.id)
  {
    let role = message.guild.roles.find(x => x.name === args);
    if(role)
    {
      data.defaultRole = role;
      ops.defaultRole.set(message.guild.id,data);

      let roleDbAdd = {
        guild: message.guild.id,
        role: role.name
      };
      
      let RoleServer = await RoleDb.findOne(server);

      if(RoleServer == null){
        RoleServer = new RoleDb(roleDbAdd);
        RoleServer.save(RoleServer);
      }
      else{
        RoleServer.updateOne(roleDbAdd);
        RoleServer.save();
      }
        

      let embed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setAuthor('Rub1Bot', message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`A Role Default Foi Alterada!`)
        .addField("Role:", `${data.defaultRole}`)
        .addField("A pedido de:", `${message.author.tag}`)
        .setFooter("Rub1 Bot",bot.user.displayAvatarURL)
        return message.channel.send(embed).then(m => m.delete(30000)).catch();
    }
    else{
      return message.channel.send(`Não Foi Possivel Encontrar a Role ${args}, verifique se tem a role criada`).then(m => m.delete(10000)).catch();
    }
  }
}

module.exports.help = {
  name: 'defaultrole',
  description: "Define um cargo default a ser usado quando alguem entra",
  usage: `!defaultrole [NewRole]`,
};
