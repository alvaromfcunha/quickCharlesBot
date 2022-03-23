"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var messagesUpsert = function (sock) { return function (m) {
    var type = m.type;
    var msg = m.messages[0];
    /*
      TODO:
        - Separar mensagem normal de comando (q comeca com `!`);
        - Retornar o `@` ou responder a mensagem de quem chamou, quando for grupo;
        - Ler a mensagem (2 `v` azul) quando for comando;
        - Adicionar `... is typing`.
    */
    console.log('\n[messagesUpsert]', 'type:', type);
    console.log('\n[messagesUpsert]', 'msg:', msg);
    if (!msg.key.fromMe) {
        if (type === 'notify') {
            var trigger = msg.message.conversation;
            var senderJid = msg.key.remoteJid;
            switch (trigger) {
                case '!teste':
                    sock.sendMessage(senderJid, {
                        text: "Make Short Coffee"
                    });
            }
        }
    }
}; };
exports["default"] = messagesUpsert;
