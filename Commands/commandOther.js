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
if (config.lang == "en") {

    //Command Other
    if (message.content == config.prefix + 'Other') {

        if (configcmd.Other == "1") {

            const embedOther = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Other\`\n\n**Command list :** \`${config.prefix}Prefix\` \`${config.prefix}Help\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedOther)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Other\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

}
//EN

}

module.exports.help = {

    name: 'Other'

}