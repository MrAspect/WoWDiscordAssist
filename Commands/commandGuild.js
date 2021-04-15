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

    //Command Guild
    if (message.content == config.prefix + 'Guild') {

        if (configcmd.Guild == "1") {
 
            const embedGuild = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Guild\`\n\n**Command list :** \`${message.content} search\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuild)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Guild\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Guild search
    if (message.content == config.prefix + 'Guild search') {

        if (configcmd.Guildsearch == "1") {

            const embedGuildsearch = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Guild\`\n\n**Usage :** \`${message.content} <GuildName>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuildsearch)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Guild search\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }
    
    };
    //END

    //Command Guild search <GuildName>
    var complet = message.content;
    var split = complet.split(" ")
    var guildname = split.slice(2)

    if (message.content == config.prefix + `Guild search ${guildname}`) {

        if (configcmd.Guildsearch == "1") {

            Database.Characters().query(`SELECT guildid, name, createdate FROM guild WHERE name LIKE '%${guildname}% LIMIT 5'`, function (err, guilds) {

                if (err) {

                    const embedGuildsearchError = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Guild\`\n\n**SQL ERROR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildsearchError)

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
                            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                            var year = a.getFullYear();
                            var month = months[a.getMonth()];
                            var date = a.getDate();
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var sec = a.getSeconds();
                            var time = month + ' ' + year + ', ' + date + ' at ' + hour + ':' + min + '';
                            return time;
        
                        }

                        guild += `**ID :** \`${guilds_list[i].guildid}\`\n**Name :** \`${guilds_list[i].name}\`\n**Creation Date :** \`${timeConvert()}\`\n\n`;
                
                    };

                    const embedGuildsearchSuccess = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Guild\`\n\n**Total Guild(s) find :** \`${guilds.length}\`\n**More informations** about your **research** :\n\n${guild}`)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildsearchSuccess)

                }

            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Guild search\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    }
    //END

    //Command Guild info
    if (message.content == config.prefix + 'Guild info') {

        if (configcmd.Guildinfo == "1") {

            const embedGuildinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Guild\`\n\n**Usage :** \`${message.content} <GuildID>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuildinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Guild info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }
        
    };
    //END

    //Commande Guilde info <GuildId>
    let complett = message.content;
    let splitt = complett.split(" ");
    let idguild = splitt.slice(2);

    if (message.content == config.prefix + `Guild info ${idguild}`) {

        if (configcmd.Guildinfo == "1") {

            Database.Characters().query(`SELECT c.name FROM characters as c INNER JOIN guild_member as gm ON gm.guid = c.guid && gm.guildid = ${idguild};`, function(error, membres) {
            Database.Characters().query(`SELECT g.name FROM guild as g WHERE g.guildid = ${idguild};`, function(err, gnames) {

                if (err & error){
    
                    const embedGuildinfoError = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Guild\`\n\n**SQL ERROR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildinfoError)
    
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
                    .setDescription(`**Category** : \`Guild\`\n\n**Guild :** ${gname}\n**Total Member(s) :** \`${membres.length}\`\n\n**Member(s) list :**\n${membre}`)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedGuildinfoSuccess);
    
                }
    
            })})

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Guild info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }
    
    };
    //FIN

}
//EN

}

module.exports.help = {

    name: 'Guild'

}