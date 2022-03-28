const coffeeCommand = (): string => {
	const now: Date = new Date()
  const timezone: number = 3
	
	let hours: number = now.getHours() - timezone
	let min: number = now.getMinutes()
  let sec: number = now.getMinutes()

	if(hours < 0){
		hours += 24
  }

	if(hours < 10) {
    return `Falta ${9 - hours}:${59 - min}:${60 - sec} pro café, nerdola.`
  } else if(min >= 30 && hours < 15) {
    return `${14 - hours}:${89 - min}:${60 - sec} pro próximo cafezin.`
  } else if(min < 30 && hours <= 15) {
    return `Exatos ${15 - hours}:${29 - min}:${60 - sec} pra passar vergonha com o Poulo no café.`
  } else {
    return `Daqui ${33 - hours}:${59 - min}:${60 - sec} tem coffer.`
  }
}

export {coffeeCommand as default}