// minecraft-helper-bot / index.js
// Minimal PatchFest Starter Bot

require('dotenv').config();
const mineflayer = require('mineflayer');

// Create the bot instance
const bot = mineflayer.createBot({
  host: process.env.MC_HOST || "localhost",     // Server IP
  port: process.env.MC_PORT ? parseInt(process.env.MC_PORT) : 25565,
  username: process.env.MC_USERNAME || "PatchFestBot" // Bot username
});

// Bot events
bot.once("spawn", () => {
  console.log("🤖 Bot successfully spawned into the world!");
});

commands = [
  ".hello - Greets the player",
  ".help - Lists all available commands",
  ".ping - Checks bot status [Planned]",
  ".coords - Shows bot's position"
]
// Basic chat command listener
bot.on("chat", (username, message) => {

  if (username === bot.username) return; // ignore itself

  if (message === ".hello") {
    bot.chat(`Hello ${username}! I am your helper bot 🤝`);
  }

  if (message === ".help") {
    bot.chat(`/msg ${username} Available Commands:`);
    commands.array.forEach(cmd => bot.chat(`/msg ${username} ${cmd}`));
  }

  if (message === ".coords") {
    const pos = bot.entity.position;
    posx=pos.x;
    posy=pos.y;
    posz=pos.z;
    bot.chat(`/msg ${username} My location is X:${Math.floor(posx)}, Y:${Math.floor(posy)}, Z:${Math.floor(posz)}`);
  }

  if (message === ".whereami") {
    const pos = bot.entity.position;
    posx=pos.x;
    posy=pos.y;
    posz=pos.z;
    bot.chat(`/msg ${username} My location is X:${Math.floor(posx)}, Y:${Math.floor(posy)}, Z:${Math.floor(posz)}`);
  }
});
