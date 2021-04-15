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

    //Commande Guilde
    if (message.content == config.prefix + 'Guilde') {

        if (configcmd.Guild == "1") {

            const embedGuilde = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Guilde\`\n\n**Liste des commandes :** \`${message.content} voir\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuilde)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Guilde\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Guilde voir
    if (message.content == config.prefix + 'Guilde voir') {

        if (configcmd.Guildsearch == "1") {

            const embedGuildevoir = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Guilde\`\n\n**Utilisation :** \`${message.content} <NomDeLaGuilde>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuildevoir)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Guilde voir\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }
    
    };
    //FIN

    //Commande Guilde voir <NomDeLaGuilde>
    var complet = message.content;
    var split = complet.split(" ")
    var guildname = split.slice(2)

    if (message.content == config.prefix + `Guilde voir ${guildname}`) {

        if (configcmd.Guildsearch == "1") {

            Database.Characters().query(`SELECT guildid, name, createdate FROM guild WHERE name LIKE '%${guildname}% LIMIT 5'`, function (err, guilds) {

                if (err) {

                    const embedGuildevoirErreur = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie :** \`Guilde\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildevoirErreur)

                } else {

                    var guilds_list = [];
                    var guild = "";
    
                    Object.keys(guilds).forEach(function(key) {
                        guilds_list.push(guilds[key]);
                    });
    
                    for(var i=0; i < guilds_list.length; i++) {               

                        function timeConvert(UNIX_timestamp){
    
                            let datecreation = (new Date(guilds_list[i].createdate).getTime());
    
                            var UNIX_timestamp = datecreation
                            var a = new Date(UNIX_timestamp * 1000);
                            var months = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sep','Oct','Nov','Déc'];
                            var year = a.getFullYear();
                            var month = months[a.getMonth()];
                            var date = a.getDate();
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var sec = a.getSeconds();
                            var time = month + ' ' + year + ', ' + date + ' à ' + hour + ':' + min + '';
                            return time;
        
                        }

                        guild += `**ID :** \`${guilds_list[i].guildid}\`\n**Nom :** \`${guilds_list[i].name}\`\n**Dâte de Création :** \`${timeConvert()}\`\n\n`;
                
                };

                const embedGuildevoirSuccess = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Catégorie :** \`Guilde\`\n\n**Nombre de guilde(s) trouvé :** \`${guilds.length}\`\n**Plus d'informations** sur votre **recherche** :\n\n${guild}`)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                message.channel.send(embedGuildevoirSuccess)

                }

            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Guilde voir\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    }
    //FIN

    //Commande Guilde info
    if (message.content == config.prefix + 'Guilde info') {

        if (configcmd.Guildinfo == "1") {

            const embedGuildinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Guilde\`\n\n**Utilisation :** \`${message.content} <IdDeLaGuilde>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuildinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Guilde info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }
        
    };
    //FIN

    //Commande Guilde info <GuildId>
    let complett = message.content;
    let splitt = complett.split(" ");
    let idguild = splitt.slice(2);

    if (message.content == config.prefix + `Guilde info ${idguild}`) {

        if (configcmd.Guildinfo == "1") {
 
            Database.Characters().query(`SELECT c.name FROM characters as c INNER JOIN guild_member as gm ON gm.guid = c.guid && gm.guildid = ${idguild};`, function(error, membres) {
            Database.Characters().query(`SELECT g.name FROM guild as g WHERE g.guildid = ${idguild};`, function(err, gnames) {

                if (err & error){
    
                    const embedGuildinfoErreur = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie :** \`Guilde\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildinfoErreur)
    
                } else {
    
                    var membres_list = [];
                    var membre = "";
                    var gnames_list = [];
                    var gname = "";
    
                    Object.keys(membres).forEach(function(key) {
                        membres_list.push(membres[key]);
                    });

                    Object.keys(gnames).forEach(function(key) {
                        gnames_list.push(gnames[key]);
                    });
    
                    for(var i=0; i < membres_list.length; i++) {

                        membre += `\`${membres_list[i].name}\` `;
                
                    };

                    for(var i=0; i < gnames_list.length; i++) {
                    
                        gname += `\`${gnames_list[i].name}\``;
                
                    };

                    const embedGuildinfoSuccess = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie** : \`Guilde\`\n\n**Guilde :** ${gname}\n**Nombre de membre(s) :** \`${membres.length}\`\n\n**Liste des membre(s) :**\n${membre}`)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildinfoSuccess);
    
                    }
    
            })})

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Guilde info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)
    
        }
    
    };
    //FIN

}
//FR

}

module.exports.help = {

    name: 'Guilde'

}