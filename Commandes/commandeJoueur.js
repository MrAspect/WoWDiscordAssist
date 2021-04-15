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

    //Commande Joueur
    if (message.content == config.prefix + 'Joueur') {

        if (configcmd.Player == "1") {

            const embedJoueur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Catégorie :** \`Joueur\`\n\n**Liste des commandes :** \`${message.content} enligne\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedJoueur)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Joueur\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Joueur enligne
    if (message.content == config.prefix + 'Joueur enligne') {

        if (configcmd.Playeronline == "1") {

            Database.Characters().query(`SELECT name FROM characters WHERE online = '1'`, function (err, players) {

                if (err) {

                    const embedPlayerenligneErreur = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie :** \`Joueur\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedPlayerenligneErreur)

                } else {

                    var players_list = [];
                    var player = "";
    
                    Object.keys(players).forEach(function(key) {
                        players_list.push(players[key]);
                    });
    
                    for(var i=0; i < players_list.length; i++) {               

                        player += `\`${players_list[i].name}\` `;
                
                    };

                    const embedJoueurenligneSuccess = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie :** \`Joueur\`\n\n**Joueur(s) en ligne :** \`${players.length}\`\n\n**Liste des joueur(s) en ligne :**\n${player}`)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedJoueurenligneSuccess)

                }

            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Joueur enligne\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    }
    //FIN

    //Commande Joueur info
    if (message.content == config.prefix + 'Joueur info') {

        if (configcmd.Playerinfo == "1") {

            const embedJoueurinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Joueur\`\n\n**Utilisation :** \`${message.content} <NomDuJoueur>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedJoueurinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Joueur info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //FIN

    //Commande Joueur info <NomDuJoueur>
    var complet = message.content;
    var split = complet.split(" ")
    var playername = split.slice(2)

    if (message.content == config.prefix + `Joueur info ${playername}`) {

        if (configcmd.Playerinfo == "1") {

            Database.Characters().query(`SELECT name, guid, race, class, gender, level, online, latency, creation_date, logout_time FROM characters WHERE name = '${playername}'`, function (err, infoplayers) {
    
                if (err) {
    
                    const embedPlayerinfoError = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Catégorie :** \`Joueur\`\n\n**SQL ERREUR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedPlayerinfoError)
    
                } else {
    
                    var infoplayers_list = [];
                    var infoplayer = "";
        
                    Object.keys(infoplayers).forEach(function(key) {
                        infoplayers_list.push(infoplayers[key]);
                    });
        
                    for(var i=0; i < infoplayers_list.length; i++) {               
    
                        let races = {

                            1: "Humain",
                            2: "Orc",
                            3: "Nain",
                            4: "Elfe de la nuit",
                            5: "Mort-Vivant",
                            6: "Tauren",
                            7: "Gnome",
                            8: "Troll",
                            10: "Elfe de sang",
                            11: "Draenei"

                        }

                        let classes = {
                            
                            1: "Guerrier",
                            2: "Paladin",
                            3: "Chasseur",
                            4: "Voleur",
                            5: "Prêtre",
                            6: "Chevalier de la mort",
                            7: "Chaman",
                            8: "Mage",
                            9: "Démoniste",
                            11: "Druide"

                        }

                        let gender = {

                            0: "Homme",
                            1: "Femme"

                        }

                        let onlinestatut = {

                            0: ":red_circle:",
                            1: ":green_circle:"

                        }

                        function timeConvert(UNIX_timestamp){
    
                            let datecreation = (new Date(infoplayers_list[i].creation_date).getTime()/1000);
    
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

                        infoplayer += `**ID :** \`${infoplayers_list[i].guid}\`\n**Niveau :** \`${infoplayers_list[i].level}\`\n**Race :** \`${races[infoplayers_list[i].race]}\`\n**Classe :** \`${classes[infoplayers_list[i].class]}\`\n**Sexe :** \`${gender[infoplayers_list[i].gender]}\`\n**En ligne :** ${onlinestatut[infoplayers_list[i].online]}\n**Latence :** \`${infoplayers_list[i].latency}ms\`\n**Dâte de Création :** \`${timeConvert()}\`\n`;
                    
                        const embedJoueurinfoSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Joueur\`\n\n**Plus d'informations** sur le joueur \`${infoplayers_list[i].name}\` :\n\n${infoplayer}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedJoueurinfoSuccess)

                    };
    
                }
    
            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**La commande** \`${config.prefix}Joueur info\` **est désactivée** !`)
            message.channel.send(embedConfigcmdErreur)

        }
    
    };
    //FIN

}
//FR

}

module.exports.help = {

    name: 'Joueur'

}