const goodMorningCommand = (): string => {
	const now: Date = new Date()
  const timezone: number = 3
	const hours: number = now.getHours() - timezone

  if(hours >= 0 && hours <= 6) {
    return 'Coé, vai dormir corno.'
  } else if(hours <= 12) {
    return 'Bom dia.'
  } else if(hours <= 18) {
    return 'Boa tarde.'
  } else {
    return 'Ba noit.'
  }
}

export {goodMorningCommand as default}