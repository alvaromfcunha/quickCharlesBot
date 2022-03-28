import { MessageUpdateType, WAMessage, WASocket } from "@adiwajshing/baileys" 
import commandHandler from "../handlers/commandHandler"

const messagesUpsert = (sock: WASocket) => m => {
  const type: MessageUpdateType = m.type
  const msg: WAMessage = m.messages[0]

  console.log('\n[messagesUpsert]', 'type:', type)
  console.log('\n[messagesUpsert]', 'msg:', msg)

  if(!msg.key.fromMe) {
    if(type === 'notify') {
      const senderJid: string = msg.key.remoteJid
      const botJid: string = `${sock.user.id.split(':')[0]}@${sock.user.id.split('@')[1]}`
      const mentionedJidArr: string[] | undefined = getMentionedJidArr(msg)
      const isBotMentioned: boolean = mentionedJidArr ? (mentionedJidArr.includes(botJid) ? true: false) : false

      if(isGroup(senderJid)) {
        console.log('\n[messagesUpsert]', 'isBotMentioned:', isBotMentioned)
        if(isBotMentioned) {
          sendBotMessage(sock, msg, senderJid, true)
        }
      } else {
        sendBotMessage(sock, msg, senderJid)
      }
    }
  }
}

const sendBotMessage = (sock: WASocket, msg: WAMessage, senderJid: string, isGroup: boolean = false) => {
  const composingDelayMs: number = 1500
  sock.sendPresenceUpdate('available', senderJid)
  sock.sendReadReceipt(senderJid, msg.key.participant, [msg.key.id])
  sock.sendPresenceUpdate('composing', senderJid)
  commandHandler(msg, isGroup).then(msgToSend => {
    sock.sendMessage(senderJid, msgToSend, {
      quoted: isGroup ? msg : undefined
    })
  })
  
}

const getMentionedJidArr = (msg: WAMessage): string[] | undefined => {
  if(msg.message.extendedTextMessage) {
    return msg.message.extendedTextMessage.contextInfo.mentionedJid
  } else if(msg.message.imageMessage) {
    return msg.message.imageMessage.contextInfo.mentionedJid
  }
}

const isGroup = (jid: string): boolean => jid.includes('@g.us')

export {messagesUpsert as default}