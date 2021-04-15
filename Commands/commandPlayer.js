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

    //Command Player
    if (message.content == config.prefix + 'Player') {

        if (configcmd.Player == "1") {

            const embedPlayer = new Discord.MessageEmbed()
            .setColor('#FFB900')
            setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Player\`\n\n**Command list :** \`${message.content} online\` \`${message.content} info\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPlayer)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Player\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Player online
    if (message.content == config.prefix + 'Player online') {

        if (configcmd.Playeronline == "1") {

            Database.Characters().query(`SELECT name FROM characters WHERE online = '1'`, function (err, players) {

                if (err) {

                    const embedPlayeronlineError = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Player\`\n\n**SQL ERROR :** \n\n\`${err}\``)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedPlayeronlineError)

                } else {

                    var players_list = [];
                    var player = "";
    
                    Object.keys(players).forEach(function(key) {
                        players_list.push(players[key]);
                    });
    
                    for(var i=0; i < players_list.length; i++) {               

                        player += `\`${players_list[i].name}\` `;
                
                    };

                    const embedPlayeronlineSuccess = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Player\`\n\n**Total player(s) online :** \`${players.length}\`\n\n**Here is the list of online player(s) :**\n${player}`)
                    .setTimestamp()
                    .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                    message.channel.send(embedPlayeronlineSuccess)

                }

            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Player online\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    }
    //END

    //Command Player info
    if (message.content == config.prefix + 'Player info') {

        if (configcmd.Playerinfo == "1") {

            const embedPlayerinfo = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setTitle(`\`${message.content}\``)
            .setDescription(`**Category :** \`Player\`\n\n**usage :** \`${message.content} <PlayerName>\``)
            .setTimestamp()
            .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
            message.channel.send(embedPlayerinfo)

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Player info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }

    };
    //END

    //Command Player info <PlayerName>
    var complet = message.content;
    var split = complet.split(" ")
    var playername = split.slice(2)

    if (message.content == config.prefix + `Player info ${playername}`) {

        if (configcmd.Playerinfo == "1") {

            Database.Characters().query(`SELECT name, guid, race, class, gender, level, online, latency, creation_date, logout_time FROM characters WHERE name = '${playername}'`, function (err, infoplayers) {
    
                if (err) {
    
                    const embedPlayerinfoError = new Discord.MessageEmbed()
                    .setColor('#FFB900')
                    .setTitle(`\`${message.content}\``)
                    .setDescription(`**Category :** \`Player\`\n\n**SQL ERROR :** \n\n\`${err}\``)
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

                            1: "Human",
                            2: "Orc",
                            3: "Dwarf",
                            4: "Night Elf",
                            5: "Scourge",
                            6: "Tauren",
                            7: "Gnome",
                            8: "Troll",
                            10: "Blood Elf",
                            11: "Draenei"

                        }

                        let classes = {
                            
                            1: "Warrior",
                            2: "Paladin",
                            3: "Hunter",
                            4: "Rogue",
                            5: "Priest",
                            6: "Death Knight",
                            7: "Shaman",
                            8: "Mage",
                            9: "Warlock",
                            11: "Druid"

                        }

                        let gender = {

                            0: "Male",
                            1: "Female"

                        }

                        let onlinestatut = {

                            0: ":red_circle:",
                            1: ":green_circle:"

                        }

                        function timeConvert(UNIX_timestamp){
    
                            let datecreation = (new Date(infoplayers_list[i].creation_date).getTime()/1000);
    
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

                        infoplayer += `**ID :** \`${infoplayers_list[i].guid}\`\n**Level :** \`${infoplayers_list[i].level}\`\n**Race :** \`${races[infoplayers_list[i].race]}\`\n**Class :** \`${classes[infoplayers_list[i].class]}\`\n**Gender :** \`${gender[infoplayers_list[i].gender]}\`\n**Online :** ${onlinestatut[infoplayers_list[i].online]}\n**Latency :** \`${infoplayers_list[i].latency}ms\`\n**Creation Date :** \`${timeConvert()}\`\n`;
                    
                        const embedPlayerinfoSuccess = new Discord.MessageEmbed()
                        .setColor('#FFB900')
                        .setTitle(`\`${message.content}\``)
                        .setDescription(`**Category :** \`Player\`\n\n**More informations** about the player \`${infoplayers_list[i].name}\` :\n\n${infoplayer}`)
                        .setTimestamp()
                        .setFooter(`MrAspect#5034 • WoWDiscordAssist`)
                        message.channel.send(embedPlayerinfoSuccess)

                    };
    
                }
    
            })

        } else {

            const embedConfigcmdErreur = new Discord.MessageEmbed()
            .setColor('#FFB900')
            .setDescription(`**The command** \`${config.prefix}Player info\` **is disabled** !`)
            message.channel.send(embedConfigcmdErreur)

        }
    
    }
    //END

}
//EN

}

module.exports.help = {

    name: 'Player'

}