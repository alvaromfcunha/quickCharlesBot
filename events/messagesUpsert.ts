import { MessageUpdateType, WAMessage } from "@adiwajshing/baileys"

const messagesUpsert = sock => m => {
  const type:MessageUpdateType = m.type
  const msg:WAMessage = m.messages[0]

  /*
    TODO:
      - Separar mensagem normal de comando (q comeca com `!`);
      - Retornar o `@` ou responder a mensagem de quem chamou, quando for grupo;
      - Ler a mensagem (2 `v` azul) quando for comando;
      - Adicionar `... is typing`.
  */

  console.log('\n[messagesUpsert]', 'type:', type)
  console.log('\n[messagesUpsert]', 'msg:', msg)

  if(!msg.key.fromMe) {
      if(type === 'notify') {
        const trigger:String = msg.message.conversation
        const senderJid:String = msg.key.remoteJid
          switch(trigger) {
            case '!teste':
              sock.sendMessage(senderJid, {
                 text: `Make Short Coffee` 
              })
          }
      }
  }
}

export {messagesUpsert as default}