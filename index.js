/* ---------------------------- *
* Hakula-Batata
* ~~~~~
* Hakula-Batata is a new generic bot for Discord servers.
* ~~~~~
* birthday-bot is free to use, modify and redistribute. If you mention the creator, it's better.
* Creator: Ety
* License: LGPL-3.0
* Language: Javascript with Node.js
* Additional libraries: Discord.js
* Initial use: Ety's new Discord server
 * ---------------------------- */

/** -------------------- IMPORTS ----------------------- */

const Discord = require('discord.js')

/** ---------------- GLOBAL VARIABLES ------------------ */

const bot = new Discord.Client();

const token = process.env.TK_HB_BOT;

/** --------------- INTERNAL FUNCTIONS ----------------- */

/** ----------------- DISCORD EVENTS ------------------- */

console.log("------------ Bot started! -------------");

bot.on('ready', () => {
	console.log("~~~~~~~~Bot connected!~~~~~~~~");
});
	
/** ----------------- CONNECTION ------------------- */
bot.login(token);
