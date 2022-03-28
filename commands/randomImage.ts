import { AnyMessageContent } from "@adiwajshing/baileys"
const puppeteer = require('puppeteer')

const randomImage = async (imageType) : Promise<AnyMessageContent> => {
    const cat = "https://thiscatdoesnotexist.com/"
    const horse = "https://thishorsedoesnotexist.com/"
    const person = "https://thispersondoesnotexist.com/image"
    const car = "https://www.thisautomobiledoesnotexist.com/"

    let url;

    switch(imageType) {
      case 'gato':
      case 'cat':
        url = cat
        break;
      case 'cavalo':
        url = horse
        break;
      case 'pessoa':
        url = person
        break;
      case 'carro':
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto();
    
        await page.waitForSelector('#vehicle');          // wait for the selector to load
        const element = await page.$('#vehicle');        // declare a variable with an ElementHandle
        let buffer = await element.screenshot();
    
        await browser.close();
        return {image: buffer}

        case 'waifu':
          let min = Math.ceil(0);
          let max = Math.floor(100000);
          let value = Math.floor(Math.random() * (max - min)) + min;
          url = `https://www.thiswaifudoesnotexist.net/example-${value}.jpg`
          break;
    }

    return {
        image: {
          url
        }
    }
}

export default randomImage