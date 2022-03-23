import makeWASocket, { DisconnectReason, useSingleFileAuthState } from '@adiwajshing/baileys'
import { Boom } from '@hapi/boom'

import messagesUpsert from './events/messagesUpsert'

async function connectToWhatsApp () {
  const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  })
  sock.ev.on('connection.update', update => {
    const { connection, lastDisconnect } = update
    if(connection === 'close') {
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
      if(shouldReconnect) {
        connectToWhatsApp()
      }
    } else if(connection === 'open') {
      console.log('opened connection')
    }
  })
  sock.ev.on('messages.upsert', messagesUpsert(sock))
  sock.ev.on('creds.update', saveState)
}

connectToWhatsApp()