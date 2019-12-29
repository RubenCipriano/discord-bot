module.exports.run = async(bot,message,args,config) => {
  if(!message.member.voiceChannel) return message.channel.send('Por favor entre em uma sala de audio!').then(msg => msg.delete(10000)).catch();
  if(!message.guild.me.voiceChannel) return message.channel.send('O Bot não está conectado a um canal de audio!').then(msg => msg.delete(10000)).catch();
  if(message.guild.me.voiceChannel.id != message.member.voiceChannelID) return message.channel.send('O bot e tu não se encontram no mesmo canal de audio!').then(msg => msg.delete(10000)).catch();
  config.active.delete(config.active.guildID);
  let vc = message.guild.me.voiceChannel;
  if(vc) vc.leave();
  message.channel.send('Bye Bye!').then(msg => msg.delete(10000)).catch();
}


module.exports.help = {
name: 'leave',
description: "Bot Sai do voiceChannel",
usage: `!leave`,
};
