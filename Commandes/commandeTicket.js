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

    //Commande Ticket
    if (message.content == config.prefix + 'Ticket') {

        if (configcmd.Ticket == "1") {

            const embedTicket = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Ticket\`\n\n**Liste des commandes :** \`${message.content} liste\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedTicket)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Ticket\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Ticket liste
    if (message.content == config.prefix + 'Ticket liste') {

        if (configcmd.Ticketlist == "1") {
    
            roleRequis = config.staffrole;

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedTicketlisteErreur = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Catégorie :** \`Ticket\`\n\nVous n'avez pas la permission d'exécuter cette commande !\n**Permission requise** : \`` + roleRequis + `\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                return message.channel.send(embedTicketlisteErreur);

            } else {

                Database.Characters().query(`SELECT id, name FROM gm_ticket WHERE completed = '0'`, function (err, tickets) {

                    if (err) {

                        const embedTicketlisteErreur = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Catégorie :** \`Ticket\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketlisteErreur)

                    } else {

                        var tickets_list = [];
                        var ticket = "";
    
                        Object.keys(tickets).forEach(function(key) {
                            tickets_list.push(tickets[key]);
                        });
    
                        for(var i=0; i < tickets_list.length; i++) {               

                            ticket += `**ID :** \`${tickets_list[i].id}\`\n**Nom :** \`${tickets_list[i].name}\`\n`;
                
                        };

                        const embedTicketlistSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Catégorie :** \`Ticket\`\n\n**Affiche seulement les ticket(s) ouvert(s) !**\n\n**Nombre de ticket(s) trouvé :** \`${tickets.length}\`\n**Liste des tickets :**\n\n${ticket}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketlistSuccess)

                    }

                })

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Ticket liste\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Ticket info
    if (message.content == config.prefix + 'Ticket info') {

        if (configcmd.Ticketinfo == "1") {

            const embedGuildinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Ticket\`\n\n**Utilisation :** \`${message.content} <IdDuTicket>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedGuildinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Ticket info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Ticket info <IdDuTicket>
    var complet = message.content;
    var split = complet.split(" ")
    var TicketId = split.slice(2)

    if (message.content == config.prefix + `Ticket info ${TicketId}`) {

        if (configcmd.Ticketinfo == "1") {

            roleRequis = '=> 𝗦𝗧𝗔𝗙𝗙'

            if (!message.member.roles.cache.some(role => role.name === roleRequis)){

                const embedTicketinfoErreur = new Discord.MessageEmbed()
                .setColor('#FFB900')
                .setTitle(`\`${message.content}\``)
                .setDescription(`**Catégorie :** \`Ticket\`\n\nVous n'avez pas la permission d'exécuter cette commande !\n**Permission requise** : \`` + roleRequis + `\``)
                .setTimestamp()
                .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                return message.channel.send(embedTicketinfoErreur);

            } else {

                Database.Characters().query(`SELECT id, playerguid, name, description, createTime, lastModifiedTime, comment, response, completed, closedBy, assignedTo, resolvedBy FROM gm_ticket WHERE id = '${TicketId}'`, function (err, tickets) {

                    if (err) {

                        const embedTicketinfoErreur = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Catégorie :** \`Ticket\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketinfoErreur)

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
                                var months = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sep','Oct','Nov','Déc'];
                                var year = a.getFullYear();
                                var month = months[a.getMonth()];
                                var date = a.getDate();
                                var hour = a.getHours();
                                var min = a.getMinutes();
                                var sec = a.getSeconds();
                                var time = date + ' ' + month + ' ' + year + ' à ' + hour + 'h' + min + '';
                                return time;
        
                            }

                            function timeConverter(UNIX_timestamp){
    
                                let datecreation = (new Date(tickets_list[i].lastModifiedTime).getTime());
    
                                var UNIX_timestamp = datecreation
                                var a = new Date(UNIX_timestamp * 1000);
                                var months = ['Jan','Fev','Mar','Avr','Mai','Juin','Juil','Aout','Sep','Oct','Nov','Déc'];
                                var year = a.getFullYear();
                                var month = months[a.getMonth()];
                                var date = a.getDate();
                                var hour = a.getHours();
                                var min = a.getMinutes();
                                var sec = a.getSeconds();
                                var time = date + ' ' + month + ' ' + year + ' à ' + hour + 'h' + min + '';
                                return time;
        
                            }

                            ticket += `**ID :** \`${tickets_list[i].id}\`\n**Joueur :** \`${tickets_list[i].name}\`\n**Joueur(GUID) :** \`${tickets_list[i].playerguid}\`\n**Dâte de Création :** \`${timeConvert()}\`\n**Dernière Modification :** \`${timeConverter()}\`\n**Commentaire :** \`${tickets_list[i].comment}\`\n**Complet :** \`${tickets_list[i].completed}\`\n\n**Assigné à :** \`${tickets_list[i].assignedTo}\`\n**Résolu par :** \`${tickets_list[i].resolvedBy}\`\n\n**Message :** \`${tickets_list[i].description}\`\n\n**Réponse :** \`${tickets_list[i].response}\`\n\n`;
                
                        };

                        const embedTicketinfoSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Catégorie :** \`Ticket\`\n\n**Plus d'informations** sur le **Ticket** \`N°${TicketId}\` :\n\n${ticket}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedTicketinfoSuccess)

                    }

                })

            }

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Ticket info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

}
//FR

}

module.exports.help = {

    name: 'Ticket'

}