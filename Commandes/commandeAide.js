const Database = require('../Loader/database.js');

const Discord = require('discord.js');
let loader = require('../Loader/loader');

module.exports.run = async (bot, message, args) => {

    let configreset = '../Config/config.json'
    delete require.cache[require.resolve(configreset)]
    let config = loader.config();

    let configcmdreset = '../Config/configcmd.json'
    delete require.cache[require.resolve(configcmdreset)]
    let configcmd = loader.configcmd();

//FR
if (config.lang == "fr") {

    //Commande Aide
    if (message.content == config.prefix + 'Aide') {

        if (configcmd.Help == '1') {


            const embedAide = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Autres\`\n\n**Liste des commandes :** \`${config.prefix}Autres\` \`${config.prefix}Guilde\` \`${config.prefix}Joueur\` \`${config.prefix}Ticket\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedAide)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Aide\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

}
//FR

}

module.exports.help = {

    name: 'Aide'

}