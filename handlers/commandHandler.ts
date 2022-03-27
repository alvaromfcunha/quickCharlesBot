import { AnyRegularMessageContent, WAMessage } from "@adiwajshing/baileys"

class SimpleMessageContext {
  msgType: string
  command: string
}

const parseMessage = (msg: WAMessage): SimpleMessageContext | undefined => {
  if(msg.message.conversation) {
    const text = msg.message.conversation
    return {
      msgType: 'text',
      command: parseCommand(text)
    }
  } else if(msg.message.extendedTextMessage) {
    const text = msg.message.extendedTextMessage.text
    return {
      msgType: 'text',
      command: parseCommand(text)
    }
  } else if(msg.message.imageMessage) { // Nao cai aqui quando eh grupo. ARRUMAR isBotMentioned no messagesUpsert.
    const text = msg.message.imageMessage.caption
    return {
      msgType: 'image',
      command: parseCommand(text)
    }
  } else {
    return undefined
  }
}

const parseCommand = (text: string): string => { 
  const pattern = /!(\w+)/g
  const matches = pattern.exec(text)
  return matches ? matches[1] : ''
}

const commandHandler = (msg: WAMessage): AnyRegularMessageContent => {
  const parsedMessage: SimpleMessageContext = parseMessage(msg)

  console.log('\n[commandHandler]', 'parsedMessage:', parsedMessage)

  if(parsedMessage) {
    const command: string = parsedMessage.command
    const msgType: string = parsedMessage.msgType
  
    switch(command) {

      // Lista de Comandos:

      case 'teste':
        return {
          text: `Quick Charles type: ${msgType}` 
        }

      // Cabo os comandos.
      
      default:
        return {
          text: 'Comando não encontrado!'
        }
    }
  } else {
    return {
      text: 'Tipo de mensagem nao supotada!'
    }
  }
}

export {commandHandler as default}