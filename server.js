const Discord = require('discord.js');
const fs = require('fs');

let config = require('./Config/config.json');
let configcmd = require('./Config/configcmd.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./Commands/', (err, files) => {

	console.log('                                                          ')
	console.log('           | ./Commands.. 💤  ')

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'js');

	if(jsfile.length <= 0){

		console.log('              => ❌   ');
  		console.log('                                                          ')
	  	return;

	}

	jsfile.forEach((f, i) =>{

	  	let props = require(`./Commands/${f}`);
	  	console.log(`              => -${f} ✔️   `);
	  	bot.commands.set(props.help.name, props);

	})

});

fs.readdir('./Commandes/', (err, files) => {

	console.log('                                                          ')
	console.log('           | ./Commandes.. 💤  ')

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'js');

	if(jsfile.length <= 0){

		console.log('              => ❌   ');
  		console.log('                                                          ')
	  	return;

	}

	jsfile.forEach((f, i) =>{

	  	let props = require(`./Commandes/${f}`);
	  	console.log(`              => -${f} ✔️   `);
	  	bot.commands.set(props.help.name, props);

	})

});

fs.readdir('./Config/', (err, files) => {

	console.log('                                                          ')
	console.log('           | ./Config.. 💤  ')

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'json');

	if(jsfile.length <= 0){

		console.log('              => ❌   ');
  		console.log('                                                          ')
	  	return;

	}

	jsfile.forEach((f, i) =>{

	  	let props = require(`./Config/${f}`);
	  	console.log(`              => -${f} ✔️   `);

	})

});

fs.readdir('./Loader/', (err, files) => {

	console.log('                                                          ')
	console.log('           | ./Loader.. 💤  ')

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split('.').pop() === 'js');

	if(jsfile.length <= 0){

		console.log('              => ❌   ');
  		console.log('                                                          ')
	  	return;

	}

	jsfile.forEach((f, i) =>{

	  	let props = require(`./Loader/${f}`);
	  	console.log(`              => -${f} ✔️   `);

	})

});

bot.on('message', async message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	let content = message.content.split(' ');
	let command = content[0];
	let args = content.slice(1);
	let prefix = config.prefix;
	let commandfile = bot.commands.get(command.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);

});

bot.on('ready', function() {

	if (configcmd.Presence == "1") {

		if (config.lang == "en") {

			bot.user.setPresence({ activity: { name: `${config.prefix}Help` }, status: 'idle', type: 'WATCHING' });

		}

		if (config.lang == "fr") {

			bot.user.setPresence({ activity: { name: `${config.prefix}Aide` }, status: 'idle', type: 'WATCHING' });

		}

	}

	console.log('                                                                               ')
  	console.log('|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|')
  	console.log('|                                                                               |')
  	console.log('|                                WoWDiscordAssist                               |')
  	console.log('|                                    Is Ready                                   |')
  	console.log('|                                                                               |')
  	console.log('|~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|')
  	console.log('                                                          ')

});

if (configcmd.Joinmessage == "1") {

	if (config.lang == "en") {

		bot.on('guildMemberAdd', member => {

			const role= member.guild.roles.cache.find(role => role.name === config.welcomerole);
    		const channel = member.guild.channels.cache.find(channel => channel.name === config.welcomechannel)
    		if (!channel) return;

    		const embedJoin = new Discord.MessageEmbed()
			.setColor('#FFB900')
			.setDescription(`${member} has just joined \`WoWDiscordAssist\` ( :white_check_mark: )`)
    		channel.send(embedJoin)
			member.roles.add(role);
	
		});

	}

	if (config.lang == "fr") {

		bot.on('guildMemberAdd', member => {

			const role= member.guild.roles.cache.find(role => role.name === config.welcomerole);
    		const channel = member.guild.channels.cache.find(channel => channel.name === config.welcomechannel)
    		if (!channel) return;

    		const embedJoin = new Discord.MessageEmbed()
			.setColor('#FFB900')
			.setDescription(`${member} vient de rejoindre \`WoWDiscordAssist\` ( :white_check_mark: )`)
    		channel.send(embedJoin)
			member.roles.add(role);
	
		});

	}

};


if (configcmd.Leftmessage == "1") {

	if (config.lang == "en") {

		bot.on('guildMemberRemove', member => {

			const channel = member.guild.channels.cache.find(channel => channel.name === config.welcome)
			if (!channel) return;

			const embedLeft = new Discord.MessageEmbed()
			.setColor('#FFB900')
			.setDescription(`${member} has just lefted  \`WoWDiscordAssist\` ( :x: )`)
			channel.send(embedLeft)

		});

	}


	if (config.lang == "fr") {

		bot.on('guildMemberRemove', member => {

    		const channel = member.guild.channels.cache.find(channel => channel.name === config.welcome)
    		if (!channel) return;

    		const embedLeft = new Discord.MessageEmbed()
			.setColor('#FFB900')
			.setDescription(`${member} vient de quitter \`WoWDiscordAssist\` ( :x: )`)
    		channel.send(embedLeft)
	
		});

	}

};

bot.login(config.token)