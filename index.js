const Discord = require('discord.js');
const client = new Discord.Client();
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const unfilteredMessageQueue = [];
const filteredMessages = [];
const unfilteredMessageQueueTimeout = 1000;
const filteredMessageQueueTimeout = 1000;

client.on('ready', () => {
    console.log('Bot is ready');
});
client.on('message', msg => {
    unfilteredMessageQueue.push(msg);
});
client.login('');

setInterval( async () => {
    const msg = unfilteredMessageQueue.pop();
    if (msg && msg.channel.name.toLowerCase().indexOf("diggydig") > -1 && msg.author.username.indexOf("diggy") === -1)  {
        filteredMessages.unshift(msg);
    }
}, unfilteredMessageQueueTimeout);

setInterval( async () => {
    const msg = filteredMessages.pop();
    if (msg) {
        const commandsJSON = fs.readFileSync("./commands.json","utf8");
        const commands = JSON.parse(commandsJSON);
        const command = commands.find(c => c.name.toLowerCase() === msg.content.toLowerCase());
        if (command) {
            const scriptPath = path.join(__dirname, 'scripts', `${command.name}.js`);
            if (fs.existsSync(scriptPath)) {
                const scriptText = fs.readFileSync(scriptPath);
                const script = new vm.Script(scriptText);
                vm.createContext(command.context);
                script.runInContext(command.context);
                msg.reply(command.context.responseText || "you broke me");
            } else {
                msg.reply("you broke me");
            }
        } else {
            msg.reply("unrecognised command");
        }
    }
}, filteredMessageQueueTimeout);