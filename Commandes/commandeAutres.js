const Database = require('../Loader/database.js');

const Discord = require('discord.js');
let loader = require('../Loader/loader');
let config = loader.config();

module.exports.run = async (bot, message, args) => {

    let configreset = '../Config/config.json'
    delete require.cache[require.resolve(configreset)]
    let config = loader.config();

    let configcmdreset = '../Config/configcmd.json'
    delete require.cache[require.resolve(configcmdreset)]
    let configcmd = loader.configcmd();


//FR
if (config.lang == "fr") {

    //Commande Autres
    if (message.content == config.prefix + 'Autres') {

        if (configcmd.Other == "1") {

            const embedOther = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Autres\`\n\n**Liste des commandes :** \`${config.prefix}Préfixe\` \`${config.prefix}Aide\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedOther)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Autres\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

}
//FR

}

module.exports.help = {

    name: 'Autres'

}