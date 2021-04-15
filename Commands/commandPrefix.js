const Discord = require('discord.js');
let loader = require('../Loader/loader');
const fs = require('fs');
const path = require('path');

module.exports.run = async (bot, message, args) => {

    let configreset = '../Config/config.json'
    delete require.cache[require.resolve(configreset)]
    let config = loader.config();

    let configcmdreset = '../Config/configcmd.json'
    delete require.cache[require.resolve(configcmdreset)]
    let configcmd = loader.configcmd();

//EN
if (config.lang == "en") {

    //Command Prefix
    if (message.content == config.prefix + 'Prefix') {

        if (configcmd.Prefix == "1") {

            const embedPrefix = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Other\`\n\n**Command list :** \`${message.content} info\` \`${message.content} mod\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPrefix)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Prefix\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Prefix info
    if (message.content == config.prefix + 'Prefix info') {

        if (configcmd.Prefixinfo == "1") {

            const embedPrefixinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Other\`\n\nThe **currently** used **prefix** is \`${config.prefix}\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPrefixinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Prefix info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Command Prefix mod
    if (message.content == config.prefix + 'Prefix mod') {

        if (configcmd.Prefixmod == "1") {

            const embedPrefixmod = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Other\`\n\nUsage : \`${message.content} <Prefix>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPrefixmod)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Prefix mod\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Command Prefix mod <prefix>
    let complet = message.content;
    let split = complet.split(" ");
    let prefix = split.slice(2);

    if (message.content == config.prefix + `Prefix mod ${prefix}`){

        if (configcmd.Prefixmod == "1") {

            roleRequis = config.adminrole;

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedPrefixmodError = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Category :** \`Other\`\n \nYou do not have permission to execute this command !\n**Permission required** : \`` + roleRequis + `\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                return message.channel.send(embedPrefixmodError);

            } else {

		        let newprefix = {
			        prefix: `${prefix}`,
			        token: `${config.token}`,
                    welcomechannel: `${config.welcomechannel}`,
                    welcomerole: `${config.welcomerole}`,
                    adminrole: `${config.adminrole}`,
                    staffrole: `${config.staffrole}`,
                    lang: `${config.lang}`
		        }

		        fs.writeFileSync(
			        path.join(process.cwd(), './Config/config.json'),
			        JSON.stringify(newprefix, null, "\t")
		        );

                delete require.cache[require.resolve('../Config/config.json')],
                config = require("../Config/config.json")

                const embedPrefixmodSuccess = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Category :** \`Other\`\n\nA new prefix has just been defined !\n**Here is the prefix** : \`${prefix}\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                message.channel.send(embedPrefixmodSuccess)

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Prefix mod\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

	};
    //FIN

}
//EN

}

module.exports.help = {
    name: 'Prefix'
}