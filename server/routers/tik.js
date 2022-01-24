const tiktok = require('express').Router();
const purppeteer = require("puppeteer");

async function getVideo(URL) {
    const browser = await purppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto("https://musicaldown.com/id")
    await page.type('#link_url', `${URL}`)
    await page.click('#submit-form > div > div:nth-child(2) > button', {delay: 300})

//     await page.waitForSelector("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img")
//     let img = await page.$eval("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img", (element) => {
//         return element.getAttribute("src")
//     })
//     await page.waitForSelector("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)")
//     let mp4server1 = await page.$eval("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)", (element) => {
//         return element.getAttribute("href")
//     })
    await page.waitForSelector("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)")
    let mp4server2 = await page.$eval("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)", (element) => {
        return element.getAttribute("href")
    })
    return {mp4server2}
    
}

tiktok.get('/', async (req, res) => {
    try {
        var URL = req.query.URL;
        const gets = await getVideo(URL);
        res.json(gets)
    } catch (err) {
        console.log(err)
    }
    
});

module.exports = tiktok;
