import { AnyRegularMessageContent, WAMessage } from "@adiwajshing/baileys"

import coffeeCommand from "../commands/coffee"
import goodMorningCommand from "../commands/goodMorning"

class SimpleMessageContext {
  msgType: string
  command: string
}

const commandHandler = (msg: WAMessage, isGroup: boolean): AnyRegularMessageContent => {
  const parsedMessage: SimpleMessageContext = parseMessage(msg)

  console.log('\n[commandHandler]', 'parsedMessage:', parsedMessage)

  if(parsedMessage) {
    const command: string = parsedMessage.command
    const msgType: string = parsedMessage.msgType
  
    switch(command) {

      // Lista de Comandos:

      case 'dia': 
        return {
          text: goodMorningCommand()
        }
      case 'cafe':
        return {
          text: coffeeCommand()
        }
      case 'teste_mensagem':
        return {
          text: `msg type: ${msgType}` 
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

export {commandHandler as default}