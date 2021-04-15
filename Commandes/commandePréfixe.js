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

//FR
if (config.lang == "fr") {

    //Commande Prefix
    if (message.content == config.prefix + 'Préfixe') {

        if (configcmd.Prefix == '1') {

        const embedPréfixe = new Discord.MessageEmbed()
        .setColor('#FFB900')
        .setTitle(`\`${message.content}\``)
        .setDescription(`**Catégorie :** \`Autres\`\n\n**Liste des commandes :** \`${message.content} info\` \`${message.content} modif\``)
        .setTimestamp()
        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
        message.channel.send(embedPréfixe)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Préfixe\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Préfixe info
    if (message.content == config.prefix + 'Préfixe info') {

        if (configcmd.Prefixinfo == '1') {

            const embedPréfixeinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Autres\`\n\nLe **préfixe** actuellement **utilisé** est \`${config.prefix}\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPréfixeinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Préfixe info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Préfixe modif
    if (message.content == config.prefix + 'Préfixe modif') {

        if (configcmd.Prefixmod == '1') {

        const embedPréfixemodif = new Discord.MessageEmbed()
        .setColor('#FFB900')
        .setTitle(`\`${message.content}\``)
        .setDescription(`**Catégorie :** \`Autres\`\n\nUtilisation : \`${message.content} <Préfixe>\``)
        .setTimestamp()
        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
        message.channel.send(embedPréfixemodif)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Préfixe modif\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Préfixe modif <préfixe>
    let complet = message.content;
    let split = complet.split(" ");
    let prefix = split.slice(2);

    if (message.content == config.prefix + `Préfixe modif ${prefix}`){

        if (configcmd.Prefixmod == '1') {

            roleRequis = config.adminrole;

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedPrefixmodError = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Catégorie :** \`Autres\`\n \nVous n'avez pas la permission d'exécuter cette commande !\n**Permission requise** : \`` + roleRequis + `\``)
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

                const embedPréfixemodifSuccess = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Catégorie :** \`Autres\`\n\nUn nouveau préfixe vient d'être défini !\n**Voici le préfixe** : \`${prefix}\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                message.channel.send(embedPréfixemodifSuccess)

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Préfixe modif\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

	};
    //FIN

}
//FR

}

module.exports.help = {
    name: 'Préfixe'
}