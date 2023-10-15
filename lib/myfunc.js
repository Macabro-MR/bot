/**
   * Create By Dika Ardnt.
   * Contact Me on wa.me/6288292024190
   * Follow https://github.com/DikaArdnt
*/

const { proto, delay, getContentType } = require('@whiskeysockets/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const { defaultMaxListeners } = require('stream')


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Dia, " : " Dias, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Hora, " : " Horas, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Minuto, " : " Minutos, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Segundo" : " Segundos") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('America/Sao_Paulo').locale('id').format(format)
	}
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
				myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error gatau apah')
        }
    })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participants) => {
        let admins = []
        for (let i of participants) {
            i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins || []
     }

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (conn, m, store) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (info.key) {
        info.id = info.key.id
        info.isBaileys = info.id.startsWith('BAE5') && info.id.length === 16
        info.chat = info.key.remoteJid
        info.fromMe = info.key.fromMe
        info.isGroup = info.chat.endsWith('@g.us')
        info.sender = conn.decodeJid(info.fromMe && conn.user.id || info.participant || info.key.participant || info.chat || '')
        if (info.isGroup) info.participant = conn.decodeJid(info.key.participant) || ''
    }
    if (info.message) {
        info.mtype = getContentType(info.message)
        info.msg = (info.mtype == 'viewOnceMessage' ? info.message[info.mtype].message[getContentType(info.message[info.mtype].message)] : info.message[info.mtype])
        info.body = info.message.conversation || info.msg.caption || info.msg.text || (info.mtype == 'listResponseMessage') && info.msg.singleSelectReply.selectedRowId || (info.mtype == 'buttonsResponseMessage') && info.msg.selectedButtonId || (info.mtype == 'viewOnceMessage') && info.msg.caption || info.text
        let quoted = info.quoted = info.msg.contextInfo ? info.msg.contextInfo.quotedMessage : null
        info.mentionedJid = info.msg.contextInfo ? info.msg.contextInfo.mentionedJid : []
        if (info.quoted) {
            let type = getContentType(quoted)
			info.quoted = info.quoted[type]
            if (['productMessage'].includes(type)) {
				type = getContentType(info.quoted)
				info.quoted = info.quoted[type]
			}
            if (typeof info.quoted === 'string') info.quoted = {
				text: info.quoted
			}
            info.quoted.mtype = type
            info.quoted.id = info.msg.contextInfo.stanzaId
			info.quoted.chat = info.msg.contextInfo.remoteJid || info.chat
            info.quoted.isBaileys = info.quoted.id ? info.quoted.id.startsWith('BAE5') && info.quoted.id.length === 16 : false
			info.quoted.sender = conn.decodeJid(info.msg.contextInfo.participant)
			info.quoted.fromMe = info.quoted.sender === (conn.user && conn.user.id)
            info.quoted.text = info.quoted.text || info.quoted.caption || info.quoted.conversation || info.quoted.contentText || info.quoted.selectedDisplayText || info.quoted.title || ''
			info.quoted.mentionedJid = info.msg.contextInfo ? info.msg.contextInfo.mentionedJid : []
            info.getQuotedObj = info.getQuotedMessage = async () => {
			if (!info.quoted.id) return false
			let q = await store.loadMessage(info.chat, info.quoted.id, conn)
 			return exports.smsg(conn, q, store)
            }
            let vM = info.quoted.fakeObj = info.fromObject({
                key: {
                    remoteJid: info.quoted.chat,
                    fromMe: info.quoted.fromMe,
                    id: info.quoted.id
                },
                message: quoted,
                ...(info.isGroup ? { participant: info.quoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            info.quoted.delete = () => conn.sendMessage(info.quoted.chat, { delete: vinfo.key })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            info.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
              *
              * @returns
            */
            info.quoted.download = () => conn.downloadMediaMessage(info.quoted)
        }
    }
    if (info.msg.url) info.download = () => conn.downloadMediaMessage(info.msg)
    info.text = info.msg.text || info.msg.caption || info.message.conversation || info.msg.contentText || info.msg.selectedDisplayText || info.msg.title || ''
    /**
	* Reply to this message
	* @param {String|Object} text 
	* @param {String|false} chatId 
	* @param {Object} options 
	*/
    info.reply = (text, chatId = info.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
    /**
	* Copy this message
	*/
	info.copy = () => exports.smsg(conn, info.fromObject(info.toObject(m)))

	/**
	 * 
	 * @param {*} jid 
	 * @param {*} forceForward 
	 * @param {*} options 
	 * @returns 
	 */
	info.copyNForward = (jid = info.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    return m
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Arquivo editado: ${__filename}`))
	delete require.cache[file]
	require(file)
})
