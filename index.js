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

// Keys
const token = process.env.TK_HB_BOT;

// Channels
const adm_cn = process.env.ADM_CN;
const reglement_cn = process.env.RGM_CN;
const roles_cn = process.env.ROL_CN;

var canal_reglement, canal_roles, canal_admissions;

// Roles
const rentree_rl = process.env.RNT_RL;


/** --------------- INTERNAL FUNCTIONS ----------------- */

function createEmbedMessage(member, admission)
{
	let RE = new Discord.RichEmbed()
		.setAuthor(member.user.username, member.user.displayAvatarURL)
		.setFooter("La Direction");
	if(admission)
	{
		RE.setColor("#4ee121")
		  .setDescription("Bienvenue à " + member + " dans **La Récréation** ! Lis le " + canal_reglement + " et assigne tes rôles dans " + canal_roles + ".");
	}
	else
	{
		RE.setColor("#e1215b")
		.setDescription(member + " a quitté **La Récréation**. On lui souhaite une bonne continuation de sa scolarité.");
	}
	return RE;
}

/** ----------------- DISCORD EVENTS ------------------- */

console.log("------------ Bot started! -------------");

bot.on('ready', () => {
	console.log("~~~~~~~~ Bot connected! ~~~~~~~~");
	canal_reglement = bot.channels.get(reglement_cn);
	canal_roles = bot.channels.get(roles_cn);
	canal_admissions = bot.channels.get(adm_cn);
});
	
bot.on('guildMemberAdd',  member => {
		console.log('New member - ' + member.user.username);
		
		let joinRE = createEmbedMessage(member, true);
		canal_admissions.send(joinRE);
		member.addRole(rentree_rl);
});

bot.on('guildMemberRemove', member => {
		console.log('Member leaving - ' + member.user.username);
		
		let leaveRE = createEmbedMessage(member, false);
		canal_admissions.send(leaveRE);
});

/** ----------------- CONNECTION ------------------- */
bot.login(token);
