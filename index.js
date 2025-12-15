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

// Add Pathfinder
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder');
bot.loadPlugin(pathfinder);

// Bot events
bot.once("spawn", () => {
  console.log("🤖 Bot successfully spawned into the world!");
});

commands = [
  ".hello - Greets the player",
  ".help - Lists all available commands",
  ".ping - Checks bot status [Planned]",
  ".coords - Shows bot's position",
  ".come - Bot moves to given coordinates"
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
    bot.chat(`/msg ${username} My location is X:${Math.floor(pos.x)}, Y:${Math.floor(pos.y)}, Z:${Math.floor(pos.z)}`)
  }
  
  if (message.startsWith(".")) {
    arr = message.split(" ");
    if (length < 4 ) {
      bot.chat("Usage:.come <x_coords> <y_coords> <z_coords>")
      return;
    }
    if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z)) {
      bot.chat("Usage:.come <x_coords> <y_coords> <z_coords>");
      return;
    }
    if (cmd === ".come") {
      const MCData = require('minecraft-data')(bot.version);
      const mvms = new Movements(bot, MCData);
      bot.pathfinder.setMovements(mvms);
      bot.chat("On my way!")
      bot.pathfinder.setGoal(
        new goals.GoalBlock(x,y,z)
      )
    }
  }
});
