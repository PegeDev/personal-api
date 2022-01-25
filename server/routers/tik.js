const tiktok = require('express').Router();
const purppeteer = require("puppeteer");

async function getVideo(URL) {
    const browser = await purppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto("https://snaptik.app/en")
    await page.type("#url", `${URL}`)
    await page.click("#submiturl", {delay: 300})

    await page.waitForSelector("#snaptik-video > article > div.snaptik-left > img")
    let img = await page.$eval("#snaptik-video > article > div.snaptik-left > img", (el) => {
        return el.getAttribute("src")
    })
    
    let author = await page.$eval("#snaptik-video > article > div.snaptik-middle.center > h3", el => el.innerText)
    
    let caption = await page.$eval("#snaptik-video > article > div.snaptik-middle.center > p:nth-child(2) > span", el => el.innerText)

    await page.waitForSelector("#download-block > div > a:nth-child(1)")
    let mp4 = await page.$eval("#download-block > div > a:nth-child(1)", (el) => {
        return el.getAttribute("href")
    })
    
    return {mp4, author, img, caption}
    
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
