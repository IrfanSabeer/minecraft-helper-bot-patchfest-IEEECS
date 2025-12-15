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

const commands = [
  ".hello - Greets the player",
  ".help - Lists all available commands",
  ".ping - Checks bot status [Planned]",
  ".coords - Shows bot's position",
  ".stop - stops current bot actions",
  ".follow - bot follows specified player"
]
// Bot Pathfinder
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
bot.loadPlugin(pathfinder);

// Basic chat command listener
bot.on("chat", (username, message) => {


  if (username === bot.username) return; // ignore itself

  // Parser
  const l = message.split(" ")
  let command = l[0];
  let args = l.slice(1);
  const D = {command,args}

  if (command === ".hello") {
    bot.chat(`Hello ${username}! I am your helper bot 🤝`);
  }

  if (command === ".help") {
    bot.chat(`/msg ${username} Available Commands:`);
    commands.forEach(cmd => bot.chat(`/msg ${username} ${cmd}`));

  }
  if (command === ".coords") {
    const pos = bot.entity.position;
    bot.chat(`/msg ${username} My location is X:${Math.floor(pos.x)}, Y:${Math.floor(pos.y)}, Z:${Math.floor(pos.z)}`);  
  }
  if (command.startsWith(".follow")) {
    const MCData = require("minecraft-data")(bot.version);
    const movements = new Movements(bot,MCData);
    bot.pathfinder.setMovements(movements);

    if (bot.players[args[0]]?.entity) {

      const t = bot.players[args[0]]?.entity;

      bot.pathfinder.setGoal(
        new goals.GoalFollow(t, 2)
      )
    } else {bot.chat("Player not found")}
  }
  if (command === ".stop") {
    bot.pathfinder.setGoal(null);
  }
});
