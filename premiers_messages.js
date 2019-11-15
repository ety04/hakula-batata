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
const reglement_cn = process.env.RGM_CN;
const pre_cn = process.env.PRE_CN;

var canal_reglement, canal_pres;

// Roles
const dirlo_rl = process.env.DIR_RL;


/** --------------- INTERNAL FUNCTIONS ----------------- */

function createEmbedMessage(titre, texte)
{
	let RE = new Discord.RichEmbed()
		.setAuthor(titre)
		.setFooter("La Direction")
		.setColor("#2ddaed")
		.setDescription(texte);
	return RE;
}

/** ----------------- DISCORD EVENTS ------------------- */

console.log("------------ Bot started! -------------");

bot.on('ready', () => {
	
	
	console.log("~~~~~~~~ Bot connected for updates! ~~~~~~~~");
	canal_reglement = bot.channels.get(reglement_cn);
	canal_pres = bot.channels.get(pre_cn);
	const role_dir = canal_reglement.guild.roles.get(dirlo_rl);

	// Message pour "règlement"
	const emoji_bell = bot.emojis.find(em => em.name === '🔔');	// bell
	const emoji_check = bot.emojis.find(em => em.name === '✅');	// white_check_mark
	var titre = emoji_bell + " Règlement intérieur " + emoji_bell;
	var contenu =
	"Bienvenue sur le serveur **La Récréation**.\n"
	+ "C\'est un serveur communautaire pour échanger librement, tant que l\'organisation est suivie et que l\'on respecte ce règlement.\n"
	+ "Les règles qui vont suivre s\'ajoutent au **Règlement général de Discord**:\n"
	+ "https://discordapp.com/guidelines \n\n"
	+ "1. La vulgarité est à proscrire du serveur. Le refus d\'employer un langage correct aboutira à un kick.\n"
	+ "2. Les descriptions ou les images pornographiques, gores ou NSFW (+18) sont interdites ici.\n"
	+ "3. Le harcèlement, la divulgation d\'informations personnelles ou les insultes sont bannies de ce lieu.\n"
	+ "4. Le spam (de texte ou d'emojis) n'est pas autorisé. Ecrivez des messages corrects.\n"
	+ "5. Le rôle Elève s'obtient en rédigeant sa présentation dans " + canal_pres + ".\n"
	+ "6. **Respectez-vous** les uns les autres. Si un problème survient, envoyez un message à la " + role_dir + ".\n\n"
	+ "Réagissez avec " + emoji_check + " pour accepter le présent règlement!\n";
	
	let mess_reg = createEmbedMessage(titre, contenu);
	canal_reglement.send(mess_reg)
		.then(mess => mess.react(emoji_check))
		.catch(console.error("Failed to send/react"));
	
	// Message de présentation
	const emoji_love = bot.emojis.find(em => em.name === '💟');	// heart_decoration
	const emoji_patate = bot.emojis.find(em => em.name === '🥔');	// potato
	let pres_hak = "Bonjour. Mon nom est Hakula Batata. Je suis un robot. Mangez des patates, c'est bon pour la santé.";
	canal_pres.send(pres_hak)
		.then(message => { message.react(emoji_love); message.react(emoji_patate); })
		.catch(console.error("Failed to send/react"));

});


/** ----------------- CONNECTION ------------------- */
bot.login(token);
