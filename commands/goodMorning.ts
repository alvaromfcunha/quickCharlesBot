import { AnyMessageContent } from "@adiwajshing/baileys"

const goodMorningCommand = (): AnyMessageContent => {
	const now: Date = new Date()
  const timezone: number = 3
	const hours: number = now.getHours() - timezone

  let text = 'placeholder'

  if(hours >= 0 && hours <= 6) {
    text = 'Coé, vai dormir corno.'
  } else if(hours <= 12) {
    text = 'Bom dia.'
  } else if(hours <= 18) {
    text = 'Boa tarde.'
  } else {
    text = 'Ba noit.'
  }

  return {
    text: text
  }
}

export {goodMorningCommand as default}