/*******************************************

        TheCybers MD
        Versão: 2.0.0
        Dev: MrRoots
    Obs: venda proibida sem a autorização do criador MrRoots

*******************************************/

require('./settings/config.js');
const { AnyWASocket, WAConnection, fetchLatestBaileysVersion, makeInMemoryStore, makeWASocket, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, downloadAndSaveMediaMessage, prepareWAMessageMedia, MediaType, generateWAMessageFromContent, WAMessageStatus, GroupMetadata, MiscMessageGenerationOptions, useSingleFileAuthState, useMultiFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, delay, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent
} = require('@whiskeysockets/baileys');
const fs = require("fs");
const P = require("pino");
const ms = require('ms');
const toMs = require('ms');
const { Boom }  = require('@hapi/boom');
const fetch = require("node-fetch");
const formdata = require('form-data')
const chalk = require("chalk");
const colors = require("colors");
const speed = require('performance-now');
const moment = require("moment-timezone");
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY");
const _ = require("lodash");

//*************| CONSTS JS |**************//

const { color, bgcolor } = require("./lib/cores");
const { fetchJson, fetchText, getBase64, createExif } = require('./lib/fetcher');
const { formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, jsonformat, format, parseMention } = require('./lib/myfunc');
const { getExtension, getBuffer, getGroupAdmins, getMembros, randomBytes, getRandom, generateMessageID, addMetadata, kyun, wait, start, info, success, banner, banner2, close } = require('./lib/functions');

const { conectar_db } = require('./settings/connect');
const { verificar_nome, add_usuario } = require("./settings/db");
const User = require('./settings/model');
const { generateRandomUsername, generateRandomPassword } = require('./lib/getuser');

/********| DEFINIÇÕES DO BOT |********/

var prefix = global.prefix 

NomeDoBot = global.nomedobot 
NickDono = global.nickdono 
NickParceria = global.nickparceria 

Navegador = global.browser 
Versao_navegador = global.versionbrowser 
Link_Canal = global.mychannel 
Nome_console = global.console_name 
Nome_auth = global.auth_name 

NumeroDono = global.dono 

/********| Definições de Premiumm e etc.. |********/

// const { menu } = require('./menus/menus.js');

/*
const premium = require("./lib/premium");
const premiumgp = require("./lib/premiumgp");
const _premium = JSON.parse(fs.readFileSync('./usuarios/premium.json'));
const _premiumgp = JSON.parse(fs.readFileSync('./grupo/premium.json'));
const testegratis = require("./lib/testegratis");
const testegratisgp = require("./lib/testegratisgp");
const _testegratis = JSON.parse(fs.readFileSync('./usuarios/teste_gratis.json'));
const _testegratisgp = JSON.parse(fs.readFileSync('./grupo/teste_gratis.json'));
const teste_gratis_gerado = JSON.parse(fs.readFileSync('./usuarios/teste_gratis_gerado.json'))
const teste_gratis_geradogp = JSON.parse(fs.readFileSync('./grupo/teste_gratis_gerado.json'))
const aguardando_atendimento = JSON.parse(fs.readFileSync('./usuarios/suporte.json'))
const equipe_admin = JSON.parse(fs.readFileSync('./adms/admin.json'))
const equipe_gerente = JSON.parse(fs.readFileSync('./adms/gerente.json')) 
*/

//***********[ CONEXÃO DO BOT ]**********//

async function TheCybers () {
    const { state, saveCreds } = await useMultiFileAuthState(`./qrcode`)
    var conn = require('@whiskeysockets/baileys').default({
        logger: P({level: 'silent'}),
        auth: state,
        version: [2, 2301, 6],
        browser: [`${NomeDoBot}`, `${Navegador}`, `${Versao_navegador}`],
        printQRInTerminal: true
    });

    console.log(banner.string);
    console.log(banner2.string);
    console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━╮', 'blue')}`)
    console.log(`${color('┃', 'blue')} ${color('Script:', 'white')} ${color('Descriptografada', 'red')}`)
    console.log(`${color('┃', 'blue')} ${color('Versão:', 'white')} ${color('2.0.0', 'red')}`)
    console.log(`${color('┃', 'blue')} ${color('Dev:', 'white')} ${color('MrRoots', 'red')}`)
    console.log(`${color('╰━━━━━━━━━━━━━━━━━━━━━━━╯', 'blue')}`)
    
    conn.ev.on('group-participants.update', async (num) => {
        const mdata = await conn.groupMetadata(num.id)
        const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
        const pushname = num.id
    
    });

    //***************[ FUNÇÕES ]***************//
    conn.ev.on('messages.upsert', async (m) => {
        try {
            const info = m.messages[0]
            if (!info.message) return 
            if (info.key && info.key.remoteJid == 'status@broadcast') return
            const type = Object.keys(info.message)[0] == 'senderKeyDistributionMessage' ? Object.keys(info.message)[2] : (Object.keys(info.message)[0] == 'messageContextInfo') ? Object.keys(info.message)[1] : Object.keys(info.message)[0]
            selectedButton = (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : ''
            
            const content = JSON.stringify(info.message);
            const altpdf = Object.keys(info.message)
            
            global.prefix
            global.blocked
    
            const msg = m.messages[0]
            if (!msg.message) return 
            
            const from = info.key.remoteJid
            
            const body = (type === 'conversation' &&
            info.message.conversation.startsWith(prefix)) ?
            info.message.conversation: (type == 'imageMessage') &&
            info.message[type].caption.startsWith(prefix) ?
            info.message[type].caption: (type == 'videoMessage') &&
            info.message[type].caption.startsWith(prefix) ?
            info.message[type].caption: (type == 'extendedTextMessage') &&
            info.message[type].text.startsWith(prefix) ?
            info.message[type].text: (type == 'listResponseMessage') &&
            info.message[type].singleSelectReply.selectedRowId ?
            info.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ?
            info.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ?
            info.message[type].singleSelectReply.selectedRowId: (type == 'conn.sendMessageButtonMessage') &&
            info.message[type].selectedButtonId ?
            info.message[type].selectedButtonId: (type == 'stickerMessage') && ((info.message[type].fileSha256.toString('base64')) !== null && (info.message[type].fileSha256.toString('base64')) !== undefined) ? (info.message[type].fileSha256.toString('base64')): ""
    
            const isGrupo = info.key.remoteJid.endsWith('@g.us')
            const quoted = m.quoted ? m.quoted : m
            const mime = (quoted.msg || quoted).mimetype || ''
            const preNumberBot = conn.user.id
            const botNumber = preNumberBot.includes(':') ? preNumberBot.split(':')[0]+'@s.whatsapp.net' : preNumberBot
            const sender = isGrupo ? info.key.participant : info.key.remoteJid
            const groupMetadata = isGrupo ? await conn.groupMetadata(from) : ''
            const groupName = isGrupo ? groupMetadata.subject : ''
            const groupDesc = isGrupo ? groupMetadata.desc : ''
            const groupMembers = isGrupo ? groupMetadata.participants : ''
            const groupAdmins = isGrupo ? getGroupAdmins(groupMembers) : ''
            const isGrupoAdmins = groupAdmins.includes(sender) || false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false

            /****** [ END ] ******/

            const pushname = info.pushName ? info.pushName : ''

           // const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()

            const isCmd = body.startsWith(prefix);

            const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null 

            const arg = body.substring(body.indexOf(' ') + 1)

            const args = body.trim().split(/ +/).slice(1)

            const q = args.join(' ')

            const argsButton = selectedButton.trim().split(/ +/)


            const isImage = type == 'imageMessage'
            const isVideo = type == 'videoMessage'
            const isAudio = type == 'audioMessage'
            const isSticker = type == 'stickerMessage'
            const isContact = type == 'contactMessage'
            const isLocation = type == 'locationMessage'
            const isProduct = type == 'productMessage'
            const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
            typeMessage = body.substr(0, 50).replace(/\n/g, '')
            if (isImage) typeMessage = "Image"
            else if (isVideo) typeMessage = "Video"
            else if (isAudio) typeMessage = "Audio"
            else if (isSticker) typeMessage = "Sticker"
            else if (isContact) typeMessage = "Contact"
            else if (isLocation) typeMessage = "Location"
            else if (isProduct) typeMessage = "Product"

            const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')

            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

            const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

            const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

            const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

            const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

            let girastamp = speed()
            let latensi = speed() - girastamp
            let timestamp2 = speed()
            let latensi2 = speed() - timestamp2
            neww = performance.now()
            oldd = performance.now()
            uptime = process.uptime()
            r = (Date.now() / 1000) - info.messageTimestamp

            const enviar = (texto) => {
                conn.sendMessage(from, {text: texto}, {quoted: info})
            }

            const enviarbuton = (from, text, footer, buttons) => {
                return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
            }         
            const sendMsg = (texto) => {
                conn.sendMessage(from, {text: texto, mentions: sender}, {quoted: info})
            }

            const mentions = (teks, memberr, id) => {
                (id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})}

                const mencionar = ( foto, texto, membro, ids ) => {
                ( ids == null || ids == undefined || ids == false ) ? conn.sendMessage(from, { image: foto, caption: texto.trim(), contextInfo: { "mentionedJid": membro } }) : conn.sendMessage(from, { image: foto, caption: texto.trim(), contextInfo: { "mentionedJid": membro } })
            }

            const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant

            const menc_jid = args.join(" ").replace("@", "") + "@s.whatsapp.net"

            const costum = (pesan, tipe, target, target2) => {
                conn.sendMessage(from, pesan, tipe, {quoted: {key: {fromMe: false, participant: `${target}`, ...(from ? {remoteJid: from}: {})}, message: {conversation: `${target2}` }}})
            }

            const getFileBuffer = async (mediakey, MediaType) => {
                const stream = await downloadContentFromMessage(mediakey, MediaType)
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]) 
                }
                return buffer
            }

            const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };

            download(url, './sticker' + names + '.png', async function () {
                console.log('enviando sticker');
                let filess = './sticker' + names + '.png'
                let asw = './sticker' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${asw}`, (err) => {
                    let media = fs.readFileSync(asw)
                    conn.sendMessage(to, {sticker: media}, {sendEphemeral: true, contextInfo: { forwardingScore: 50, isForwarded: true}, quoted: info})
                    fs.unlinkSync(filess)
                    fs.unlinkSync(asw)
                    });
                });
            }

            const isUrl = (url) => {
                if (linkfy.find(url)[0]) return true
                return false
            }

            // Mensagems do console
            if (!isGrupo && isCmd) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━╮', 'magenta')}\n${color('┃', 'magenta')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'magenta')} ${color('Nome:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'magenta')} ${color('Data:', 'yellow')} ${color(data, 'white')}\n${color('┃', 'magenta')} ${color('Hora:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'magenta')} ${color('Comando:', 'yellow')} ${color(comando)}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━╯', 'magenta')}`)
            if (!isGrupo && !isCmd && !info.key.fromMe) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━╮', 'magenta')}\n${color('┃', 'magenta')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'magenta')} ${color('Nome:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'magenta')} ${color('Data:', 'yellow')} ${color(data, 'white')}\n${color('┃', 'magenta')} ${color('Hora:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'magenta')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━╯', 'magenta')}`)
            if (isGrupo && isCmd) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━╮', 'magenta')}\n${color('┃', 'magenta')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'magenta')} ${color('Nome:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'magenta')} ${color('Data:', 'yellow')} ${color(data, 'white')}\n${color('┃', 'magenta')} ${color('Hora:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'magenta')} ${color('Comando:', 'yellow')} ${color(comando)}\n${color('┃', 'magenta')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━╯', 'magenta')}`)
            if (isGrupo && !isCmd && !info.key.fromMe) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━╮', 'magenta')}\n${color('┃', 'magenta')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'magenta')} ${color('Nome:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'magenta')} ${color('Data:', 'yellow')} ${color(data, 'white')}\n${color('┃', 'magenta')} ${color('Hora:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'magenta')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('┃', 'magenta')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━╯', 'magenta')}`) 


            let retornar = {
                espere: `<❗> Aguarde 16s, já estou terminando seu pedido! <❗>`,
                sucesso: '<✔️> Sucesso ao executar o/a comando/função! <✔️>',
                erro: {
                    stick: '<❌> Desculpe-me amigo(a), mas houve falha ao converter para sticker <❌>',
                    Iv: '<❌> amigo(a), este link é inválido <❌>'
                },
                msg: {
                    grupo: '<❌> Esse comando so pode ser utilizado em grupo! <❌>',
                    donosmt: '<❌> Somente meu proprietário pode usar esse comando! <❌>',
                    donogp: '<❌> Este comando somente o grupo do meu proprietário pode usar! <❌>',
                    banmsglink: '[❗] LINK DETECTADO [❗]\n\n• Você será removido por quebrar as regras do grupo!',
                    adminmsglink: '[❗] LINK DETECTADO [❗]\n\n• Você é adm, fique tranquilo que não irei te remover.',
                    adminmsgporn: '*Olá caro adm, você enviou coisas libidonas neste grupo, vou apenas fingir que não vi nada*',
                    banmsgporn: '<❌> Atos depravados não serão tolerados aqui. <❌>',
                    admin: '<❌> Somente adm pode utilizar esse comando! <❌>',
                    Badmin: '<❌> Preciso ser adm para utilizar esse comando! <❌>'
                }
            }

            switch(comando) {

                case 'bin': {
                    var query = q
                    .split('.').join('')
                    .split('-').join('')
                    .split('/').join('')
                    .split(' ').join('');
                    if(query.length < 6 || query.length > 6) return enviar(`🔍 CONSULTA FREE 🔍\n━━━━━━━━━━━━━━━━\n╭──────────────\n┇   𝗖𝗢𝗡𝗦𝗨𝗟𝗧𝗔 𝗕𝗜𝗡:\n╰──────────────\n\nVocê precisa digitar o comando e em seguida, digite o bin que deseja consultar.\n\n𝗘𝘅𝗲𝗺𝗽𝗹𝗼:\n${prefix+comando} 498409\n━━━━━━━━━━━━━━━━`)
                    if (!isNaN(query)) {
                        await enviar('Consultando os dados, Aguarde...') 
                        console.log(`${color(`• [ CONSULTA ] ~>`, 'yellow')} ${color('Consultando o bin', 'pink')} ${color(`${query}`, 'white')}`)
                        await sleep(700);
                        await conn.sendMessage(from, { react: { text: '🕘️', key: info.key }});
                        try {
                            const api_bin = await fetchJson(`http://localhost:3000/bin/${query}`);
                            if (api_bin.resultado !== undefined) {
                                console.log(`${color(`[ BIN ENCONTRADA ]`, 'yellow')}\n\nBin: ${api_bin.resultado.bin}\nPaís: ${api_bin.resultado.pais}\nBandeira: ${api_bin.resultado.bandeira}\nTipo: ${api_bin.resultado.tipo}\nNivel: ${api_bin.resultado.nivel}\nBanco: ${api_bin.resultado.banco}\n\n• Usuário: ${pushname}\n• BY: ${nomedobot}`)
                                await enviar(`[ 𝗕𝗜𝗡 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗔 ]\n\n𝙱𝚒𝚗: ${api_bin.resultado.bin}\n𝙿𝚊𝚒́𝚜: ${api_bin.resultado.pais}\n𝙱𝚊𝚗𝚍𝚎𝚒𝚛𝚊: ${api_bin.resultado.bandeira}\n𝚃𝚒𝚙𝚘: ${api_bin.resultado.tipo}\n𝙽𝚒𝚟𝚎𝚕: ${api_bin.resultado.nivel}\n𝙱𝚊𝚗𝚌𝚘: ${api_bin.resultado.banco}\n\n• 𝚄𝚜𝚞𝚊́𝚛𝚒𝚘: ${pushname}\n• 𝙱𝚢: ${nomedobot}`)
                            } else {
                                await conn.sendMessage(from, { react: { text: '⚠️', key: info.key }});
                                enviar('⚠️ BIN NÃO ENCONTRADA!');
                            }
                        } catch(e) {
                           // console.log(e);
                            await conn.sendMessage(from, { react: { text: '❌', key: info.key }});
                            enviar('❌ ERRO AO CONSULTAR!\n\n• POR FAVOR, TENTE NOVAMENTE!');
                        }
                    } else {
                        await conn.sendMessage(from, { react: { text: '⚠️', key: info.key }});
                        console.log(`${color(`• [ CONSULTA BIN ] ~>`, 'yellow')} ${color('BIN INVÁLIDA', 'red')}`)
                        enviar('⚠️ BIN INVÁLIDA!');
                    }
                }
                break

                // Comando para gerar dados fictícios de pessoa
                case 'gerarpessoa': case 'genpessoa': {
                    fetch('http://localhost:3000/gerarpessoa') 
                        .then((response) => response.json())
                        .then((data) => {
                            const pessoa = data[0];
                            const mensagem = `👤 𝐃𝐚𝐝𝐨𝐬 𝐏𝐞𝐬𝐬𝐨𝐚𝐢𝐬\n\n𝙽𝚘𝚖𝚎: ${pessoa.nome}\n𝙸𝚍𝚊𝚍𝚎: ${pessoa.idade}\n𝙲𝚙𝚏: ${pessoa.cpf}\n𝚁𝚐: ${pessoa.rg}\n𝙳𝚊𝚝𝚊 𝙽𝚊𝚜𝚌: ${pessoa.data_nasc}\n𝚂𝚎𝚡𝚘: ${pessoa.sexo}\n𝚂𝚒𝚐𝚗𝚘: ${pessoa.signo}\n\n👫 𝐅𝐢𝐥𝐢𝐚𝐜̧𝐚̃𝐨\n\n𝙼𝚊̃𝚎: ${pessoa.mae}\n𝙿𝚊𝚒: ${pessoa.pai}\n\n⛓️ 𝐄-𝐦𝐚𝐢𝐥𝐬\n\n𝙴𝚖𝚊𝚒𝚕: ${pessoa.email}\n\n📬 𝐄𝐧𝐝𝐞𝐫𝐞𝐜̧𝐨\n\n𝙲𝚎𝚙: ${pessoa.cep}\n𝙴𝚗𝚍𝚎𝚛𝚎𝚌̧𝚘: ${pessoa.endereco}\n𝙽𝚞́𝚖𝚎𝚛𝚘: ${pessoa.numero}\n𝙱𝚊𝚒𝚛𝚛𝚘: ${pessoa.bairro}\n𝙲𝚒𝚍𝚊𝚍𝚎: ${pessoa.cidade}\n𝙴𝚜𝚝𝚊𝚍𝚘: ${pessoa.estado}\n\n📞 𝐓𝐞𝐥𝐞𝐟𝐨𝐧𝐞\n\n𝚃𝚎𝚕𝚎𝚏𝚘𝚗𝚎: ${pessoa.telefone_fixo}\n𝙲𝚎𝚕𝚞𝚕𝚊𝚛: ${pessoa.celular}\n\n🩸 𝐂𝐚𝐫𝐚𝐜𝐭𝐞𝐫𝐢𝐬𝐭𝐢𝐜𝐚𝐬 𝐅𝐢́𝐬𝐢𝐜𝐚𝐬\n\n𝙰𝚕𝚝𝚞𝚛𝚊: ${pessoa.altura}\n𝙿𝚎𝚜𝚘: ${pessoa.peso}\n𝚃𝚒𝚙𝚘 𝚂𝚊𝚗𝚐𝚞𝚒𝚗𝚎𝚘: ${pessoa.tipo_sanguineo}\n\n• 𝚄𝚜𝚎𝚛: ${pushname}`
                            conn.sendMessage(from, {image: {url: `https://telegra.ph/file/a6b4cae9050a76b3efad7.jpg`}, caption: `${mensagem}`, mentions: [sender]}, {quoted: info})
                            //enviar(mensagem);
                        })
                        .catch((error) => {
                            console.error('Erro ao buscar dados da API', error);
                            enviar('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
                        });
                }
                break             
                
                default:

                    //******[ COMANDO NÃO REGISTRADO ]******//

                    if (isCmd) { 
                        console.log(color('[ERRO]','red'), `[Comando ${comando} que foi dado por ${color(sender.split('@')[0])} não é registrado]`)
                        
                        cmd_not_found = `[❗] 𝗖𝗼𝗺𝗮𝗻𝗱𝗼 𝗻𝗮̃𝗼 𝗲𝗻𝗰𝗼𝗻𝘁𝗿𝗮𝗱𝗼!`
                        conn.sendMessage(from, {text: cmd_not_found}, {quoted: info})
                        conn.sendMessage(from, {react: {text: `⚠️`, key: info.key}})
                    }

                    if (body.startsWith("conn") || body.startsWith("Conn") || body.startsWith("conn") || body.startsWith("conn"))  {
                        conn.sendMessage(from, {react: {text: `🚩`, key: info.key}})
                        try {
                            let openai = await ia(q) // Defina a key do chatgpt no arquivo ia.js ele está dentro da pasta js
                            let response = openai[0].resposta
                            reply(`🧑🏻‍💻 ${response}`)
                        } catch(e) {
                            console.log(e)
                            reply('❌ *Oops, não é possível utilizar o comando até a key do chatgpt seja definida...*')
                        }
                    }
                    //************[ CONEXÃO FINAL ]************//
            }
        } catch(e) {
            console.log('[❗] Houve um erro! [❗]')
            console.log(e)
        }
    });


    conn.ev.on('connection.update', async (update) => {
        const { connection, qr } = update
        if (qr) {
            console.log(color("[❗] Escaneie o qrcode para conectar o bot!"))
        }
        if (connection === 'close') {
            TheCybers()
        }
        if (connection === 'open') {
            connected = true
            success('2', `Conectado com sucesso!`)
            conectar_db();
        }
        if (connection === 'connecting') {
            connected = false
            start('2', '[❗] Conexão em andamento, Aguarde...')
        }
            if (update.isNewLogin) {
            success('2', 'Conectado com sucesso!')
            conectar_db();
        }
    });
conn.ev.on ('creds.update', saveCreds)
}

TheCybers();
