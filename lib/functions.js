const fetch = require('node-fetch')
const axios = require('axios')
const cfonts = require('cfonts')
const spin = require('spinnies')
const Crypto = require('crypto')
const mimetype = require('mime-types')
const cheerio = require('cheerio')
const request = require('request')

var corzinhas = ["red","green","yellow","blue","magenta","cyan","white","gray","redBright","greenBright","yellowBright","blueBright","magentaBright","cyanBright","whiteBright"]
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))]	

const getExtension = async (type) => {
	return await mimetype.extension(type)
}

const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if (i.admin == 'admin') admins.push(i.id)
if (i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

const getMembros = (participants) => {
admins = []
for (let i of participants) {
if (i.admin == null) admins.push(i.id)
}
return admins
}

const randomBytes = (length) => {
    return Crypto.randomBytes(length);
};

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const generateMessageID = () => {
    return randomBytes(10).toString('hex').toUpperCase()
}

authorname = global.author 
packname = global.packname 
  
function addMetadata(packname, author) {	
if (!packname) packname = global.author; if (!author) author = global.packname;	
author = author.replace(/[^a-zA-Z0-9]/g, '');	
let name = `${author}_${packname}`
if (fs.existsSync(`../tmp/${name}.exif`)) return `../tmp/${name}.exif`
const json = {	
"sticker-pack-name": packname,
"sticker-pack-publisher": author,
}
const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
let len = JSON.stringify(json).length	
let last	
if (len > 256) {	
len = len - 256	
bytes.unshift(0x01)	
} else {	
bytes.unshift(0x00)	
}	
if (len < 16) {	
last = len.toString(16)	
last = "0" + len	
} else {	
last = len.toString(16)	
}	
const buf2 = Buffer.from(last, "hex")	
const buf3 = Buffer.from(bytes)	
const buf4 = Buffer.from(JSON.stringify(json))	
const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
fs.writeFile(`../tmp/${name}.exif`, buffer, (err) => {	
return `../tmp/${name}.exif`	
})	
}

function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

const wait = async (media) => new Promise(async (resolve, reject) => {
    const attachmentData = `data:image/jpeg;base64,${media.toString('base64')}`
    const response = await fetch("https://trace.moe/api/search",{method: "POST",body: JSON.stringify({ image: attachmentData }),headers: { "Content-Type": "application/json" }});
    if (!response.ok) reject(`Imagem não encontrada!`);
    const result = await response.json()
    try {
    	const { is_adult, title, title_chinese, title_romaji, title_english, episode, season, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
    	let belief = () => similarity < 0.89 ? "Não se esses dados estão corretos:" : ""
    	let ecch = () => is_adult ? "Sim" : "Não"
    	resolve({video: await getBuffer(`https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`), teks: `${belief()}
~> Ecchi : *${ecch()}*
~> Título em japones : *${title}*
~> Ortografia do Título : *${title_romaji}*
~> Título inglês : *${title_english}*
~> Episodio : *${episode}*
~> Temporada  : *${season}*`});
	} catch (e) {
		console.log(e)
		reject(`Eu não sei que anime é esse`)
	}
})

const spinner = { 
  "interval": 120,
  "frames": [
    "🌔",
    "🌓",
    "🌒",
    "🌑",
    "🌘",
    "🌗",
    "🌖",
    "🌕"
  ]}

let globalSpinner;


const getGlobalSpinner = (disableSpins = false) => {
  if (!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
  return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
	spins.add(id, {text: text})
		/*setTimeout(() => {
			spins.succeed('load-spin', {text: 'Suksess'})
		}, Number(wait) * 1000)*/
	}
const info = (id, text) => {
	spins.update(id, {text: text})
}
const success = (id, text) => {
	spins.succeed(id, {text: text})

	}

const close = (id, text) => {
	spins.fail(id, {text: text})
}

const banner = cfonts.render((`TheCybers|MD`), {
font: 'tiny',             
align: 'center',           
colors: [`${cor1}`,`${cor3}`,`${cor4}`,`${cor2}`],
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`${cor4}`,`${cor2}`],     
independentGradient: false, 
transitionGradient: false, 
env: 'node'
});  

const banner2 = cfonts.render((`Proibido a venda desse script sem autorização do criador!`), {
font: 'console',
align: 'center',
gradrient: [`${cor4}`,`${cor2}`], 
colors: [`${cor3}`,`${cor1}`,`${cor5}`],
lineHeight: 1
});

module.exports = { getExtension, getBuffer, getGroupAdmins, getMembros, randomBytes, getRandom, generateMessageID, addMetadata, kyun, wait, start, info, success, banner, banner2, close }