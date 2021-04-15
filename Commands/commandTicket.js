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

    //Command Ticket
    if (message.content == config.prefix + 'Ticket') {

        if (configcmd.Ticket == "1") {

            const embedTicket = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Ticket\`\n\n**Command list :** \`${message.content} list\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedTicket)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Ticket\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Ticket list
    if (message.content == config.prefix + 'Ticket list') {

        if (configcmd.Ticketlist == "1") {
    
            roleRequis = config.staffrole;

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedPrefixmodError = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Category :** \`Ticket\`\n\nYou do not have permission to execute this command !\n**Permission required** : \`` + roleRequis + `\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                return message.channel.send(embedPrefixmodError);

            } else {

                Database.Characters().query(`SELECT id, name FROM gm_ticket WHERE completed = '0'`, function (err, tickets) {

                    if (err) {

                        const embedTicketlistError = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Ticket\`\n\n**SQL ERROR :** \n\n\`${err}\``)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketlistError)

                    } else {

                        var tickets_list = [];
                        var ticket = "";
    
                        Object.keys(tickets).forEach(function(key) {
                            tickets_list.push(tickets[key]);
                        });
    
                        for(var i=0; i < tickets_list.length; i++) {               

                            ticket += `**ID :** \`${tickets_list[i].id}\`\n**Name :** \`${tickets_list[i].name}\`\n`;
                
                        };

                        const embedTicketlistSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Ticket\`\n\n**Show only no completed ticket(s) !**\n\n**Total Ticket(s) find :** \`${tickets.length}\`\n**Ticket(s) list :**\n\n${ticket}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketlistSuccess)

                    }

                })

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Ticket list\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Ticket info <TicketId>
    var complet = message.content;
    var split = complet.split(" ")
    var TicketId = split.slice(2)

    if (message.content == config.prefix + `Ticket info ${TicketId}`) {

        if (configcmd.Ticketinfo == "1") {

            roleRequis = '=> 𝗦𝗧𝗔𝗙𝗙'

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedTicketinfoError = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Category :** \`Ticket\`\n \nYou do not have permission to execute this command !\n**Permission required** : \`` + roleRequis + `\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                return message.channel.send(embedTicketinfoError);

            } else {

                Database.Characters().query(`SELECT id, playerguid, name, description, createTime, lastModifiedTime, comment, response, completed, closedBy, assignedTo, resolvedBy FROM gm_ticket WHERE id = '${TicketId}'`, function (err, tickets) {

                    if (err) {

                        const embedTicketinfoError = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Ticket\`\n\n**SQL ERROR :** \n\n\`${err}\``)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketinfoError)

                    } else {

                        var tickets_list = [];
                        var ticket = "";
    
                        Object.keys(tickets).forEach(function(key) {
                            tickets_list.push(tickets[key]);
                        });
    
                        for(var i=0; i < tickets_list.length; i++) {               

                            function timeConvert(UNIX_timestamp){
    
                                let datecreation = (new Date(tickets_list[i].createTime).getTime());
    
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

                            function timeConverter(UNIX_timestamp){
    
                                let datecreation = (new Date(tickets_list[i].lastModifiedTime).getTime());
    
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

                            ticket += `**ID :** \`${tickets_list[i].id}\`\n**Player :** \`${tickets_list[i].name}\`\n**PlayerGuid :** \`${tickets_list[i].playerguid}\`\n**Creation Date :** \`${timeConvert()}\`\n**Last Edit :** \`${timeConverter()}\`\n**Comment :** \`${tickets_list[i].comment}\`\n**Completed :** \`${tickets_list[i].completed}\`\n\n**Assigned To :** \`${tickets_list[i].assignedTo}\`\n**Resolved By :** \`${tickets_list[i].resolvedBy}\`\n\n**Description :** \`${tickets_list[i].description}\`\n\n**Response :** \`${tickets_list[i].response}\`\n\n`;
                
                        };

                        const embedTicketinfoSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Ticket\`\n\n**More informations** about **Ticket** \`N°${TicketId}\` :\n\n${ticket}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketinfoSuccess)

                    }

                })

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Ticket info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    }
    //END

}
//EN

}

module.exports.help = {

    name: 'Ticket'

}