import { MessageUpdateType, WAMessage, WASocket } from "@adiwajshing/baileys"
import commandHandler from "../handlers/commandHandler"

const messagesUpsert = (sock: WASocket) => m => {
  const type: MessageUpdateType = m.type
  const msg: WAMessage = m.messages[0]

  /*
    TODO:
      - Ler a mensagem (2 `v` azul) quando for comando;
      - Adicionar `... is typing`.
  */

  console.log('\n[messagesUpsert]', 'type:', type)
  console.log('\n[messagesUpsert]', 'msg:', msg)

  if(!msg.key.fromMe) {
      if(type === 'notify') {
        const composingDelayMs: number = 1500
        const senderJid: string = msg.key.remoteJid

        // isBotMentioned nao pega tipo imagem, onde nao tem contextInfo?.mentionedJid mas sim o `@` no imageMessage?.caption
        const botJid: string = `${sock.user.id.split(':')[0]}@${sock.user.id.split('@')[1]}`
        const mentionedJidArr: string[] | undefined = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
        const isBotMentioned: boolean = mentionedJidArr ? (mentionedJidArr.includes(botJid) ? true: false) : false

        // Talvez seja melhor o commandHandler saber q eh mensagem de grupo.
        if(isGroup(senderJid)) {
          if(isBotMentioned) {
            sock.sendPresenceUpdate('available', senderJid)
            sock.sendReadReceipt(senderJid, msg.key.participant, [msg.key.id])
            sock.sendPresenceUpdate('composing', senderJid)
            setTimeout(() => {
              sock.sendPresenceUpdate('paused', senderJid)
              sock.sendMessage(senderJid, commandHandler(msg), {
                quoted: msg
              })
            }, composingDelayMs)
          }
        } else {
          sock.sendPresenceUpdate('available', senderJid)
          sock.sendReadReceipt(senderJid, msg.key.participant, [msg.key.id])
          sock.sendPresenceUpdate('composing', senderJid)
          setTimeout(() => {
            sock.sendPresenceUpdate('paused', senderJid)
            sock.sendMessage(senderJid, commandHandler(msg))
          }, composingDelayMs)
        }
      }
  }
}

const isGroup = (jid: string): boolean => jid.includes('@g.us')

export {messagesUpsert as default}