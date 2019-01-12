require('dotenv').load();
const Discord = require('discord.js');
const token = process.env.token;

//should hide the key before pushing to github using envoirment variables etc
const client = new Discord.Client();

client.on('message', (msg) => {
  if(msg.content ==='!test'){
    msg.channel.send(`Hello ${msg.author}!`);
  }
  if(msg.content === '!help'){
    const embed = new Discord.RichEmbed()
    .setTitle('List of commands')
    .addField('!csgo', 'CSGO Settings', true)
    .addField('!cscross', 'CSGO crosshair settings', true)
    .addField('!cstips', 'CSGO beginner tips', true)
    .addField('!pubgtips', 'PUBG tips', true)
    .addField('!pubg', 'PUBG settings', true)
    .addField('!pubgtwitch', 'PUBG Twitch', true)
    .addField('!cstwitch', 'CSGO Twitch', true)
    .addField('!champ', 'Display the champ', true)
    .addField('!chump', 'Display salty Aaron', true)
    .setColor('#f50057')
    msg.channel.send(embed);
  }
  if(msg.content === '!champ'){
    msg.channel.send('http://media.philstar.com/images/articles/spo4-daniel-cormier-2-belts-ap_2018-11-04_23-03-07.jpg');
  }
  if(msg.content === '!chump'){
    msg.channel.send('https://cdn-s3.si.com/s3fs-public/styles/marquee_large_2x/public/2016/07/07/jon-jones-crying-press-conference-doping.jpg?itok=HMGrYFoL');
  }
  if(msg.content ==='!csgo'){
    msg.channel.send('https://prosettings.net/cs-go-best-settings-options-guide/');
  }
  if(msg.content ==='!cscross'){
    msg.channel.send('https://csgocrosshairs.com/');
  }
  if(msg.content ==='!cstips'){
    msg.channel.send('https://www.reddit.com/r/GlobalOffensive/comments/6ymo6v/beginner_intermediate_advanced_tips_to_improve_as/');
  }
  if(msg.content ==='!pubgtips'){
    msg.channel.send('https://www.reddit.com/r/PUBATTLEGROUNDS/comments/63z6zc/battlegrounds_tips_and_tricks/');
  }
  if(msg.content ==='!pubg'){
    msg.channel.send('https://prosettings.net/best-pubg-settings-options-guide/');
  }
  if(msg.content ==='!cstips'){
    msg.channel.send('https://www.reddit.com/r/GlobalOffensive/comments/6ymo6v/beginner_intermediate_advanced_tips_to_improve_as/');
  }
  if(msg.content ==='!cstips'){
    msg.channel.send('https://www.reddit.com/r/GlobalOffensive/comments/6ymo6v/beginner_intermediate_advanced_tips_to_improve_as/');
  }
  if(msg.content ==='!pubgtwitch'){
    msg.channel.send('https://www.twitch.tv/directory/game/PLAYERUNKNOWNsS%20BATTLEGROUNDS');
  }
  if(msg.content ==='!cstwitch'){
    msg.channel.send('https://www.twitch.tv/directory/game/Counter-Strike%3A%20Global%20Offensive');
  }

})

client.on('ready', ()=> {
   console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // console.log('Bot is now connected');
  // client.channels.find(x => x.name=='general').send('Hello! I have successfully connected!');
});
client.login(token);
