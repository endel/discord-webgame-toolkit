import Discord from "discord.js";
import { DI } from "./database.config";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
if (!DISCORD_BOT_TOKEN) { throw new Error("process.env.DISCORD_BOT_TOKEN: not provided!"); }

const bot = new Discord.Client();
bot.login(DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    const user = bot.user!;
    console.info(`Discord bot logged in as ${user.tag}!`);

    user.setStatus("online");
    user.setActivity({ name: "YOUR GAME NAME", type: "PLAYING" });
});

bot.on('message', async (msg) => {
    console.log("Discord Bot reading message: ", msg.content);

    // 
    // Check if message starts with "!profile"
    //
    if (msg.content.startsWith('!profile')) {
        const mentions = Array.from(msg.mentions.users.keys());
        const discord_id = mentions?.[0] || msg.author.id;
        const username = (mentions?.[0] && msg.mentions.users.get(discord_id)?.username) || msg.author.username;
        const avatar = (mentions?.[0] && msg.mentions.users.get(discord_id)?.avatar) || msg.author.avatar;

        const user = await DI.userRepository.findOne({ discord_id });
        if (!user) {
            msg.channel.send(`@${username} not registered yet!`);
            return;
        }

        // Use data from your database to display on Discord

        //
        // See embed documentation:
        // => https://discordjs.guide/popular-topics/embeds.html#embed-preview
        //
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user.username} requested this!`)
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        msg.channel.send(exampleEmbed);
    }
});