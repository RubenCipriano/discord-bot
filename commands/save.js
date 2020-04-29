var fs = require('fs');
module.exports.run = async(bot,message,args,config) => {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let cfg = JSON.stringify(config);
        fs.writeFile('./config.json', cfg, function(err) {
            if (err) {
                console.log('There has been an error saving your configuration data.');
                console.log(err.message);
                return;
              }
              return message.channel.send("A sua configuração foi salva!");
        });
    }
}

module.exports.help = {
  name: 'save',
  description: "Comando de salvar config!",
  usage: `!save`,
};