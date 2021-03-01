const Discord = require('discord.js');
const discordBot = new Discord.Client();

discordBot.on('ready', () => console.log('Discord bot is connected.'));

discordBot.on('message', (message) => {
    //console.log(message.author.username + ' ha dicho: \"' + message.content + '\"');
});

//Discord bot connect!
discordBot.login(process.env.DISCORD_BOT_TOKEN);

module.exports = discordBot;
