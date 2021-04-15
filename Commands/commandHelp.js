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

//EN
if (config.lang == "en") {

    //Command Help
    if (message.content == config.prefix + 'Help') {

        if (configcmd.Help == "1") {

            const embedHelp = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Other\`\n\n**Command list :** \`${config.prefix}Other\` \`${config.prefix}Guild\` \`${config.prefix}Player\` \`${config.prefix}Ticket\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedHelp)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Help\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

}
//EN

}

module.exports.help = {

    name: 'Help'

}