import { AnyMessageContent, WAMessage } from "@adiwajshing/baileys"

import {randomImage, coffeeCommand, goodMorningCommand} from "../commands/index"

class SimpleMessageContext {
  msgType: string
  command: string
}

const commandHandler = async (msg: WAMessage, isGroup: boolean): Promise<AnyMessageContent> => {
  return new Promise((resolve, reject) => {
    const parsedMessage: SimpleMessageContext = parseMessage(msg)

    console.log('\n[commandHandler]', 'parsedMessage:', parsedMessage)
  
    if(parsedMessage) {
      const command: string = parsedMessage.command
      const msgType: string = parsedMessage.msgType
    
      switch(command) {
  
        // Lista de Comandos:
  
        case 'dia': 
         resolve(goodMorningCommand())
          break
  
        case 'cavalo':
        case 'pessoa':
        case 'carro': 
        case 'gato':
        case 'cat': 
        case 'waifu':
          randomImage(command).then(resolve)
          break
        
        case 'cafe':
          resolve(coffeeCommand())
          break

        case 'teste_mensagem':
          resolve({
            text: `msg type: ${msgType}` 
          })
          break
  
        // Cabo os comandos.
        
        default:
          resolve({
            text: 'Comando não encontrado!'
          })
          break
      }
    } else {
      resolve({
        text: 'Tipo de mensagem nao supotada!'
      })
    }
  })
  
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
  } else if(msg.message.imageMessage) {
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