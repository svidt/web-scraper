const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://politiken.dk'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.article-intro__title', html).each(function() {
            const headline = $(this).text().trim('\n')
            const url = $(this).find('a').attr('href')
            articles.push({
                headline,
                url
            })
        })

        $('.footer__col-item', html).each(function() {
            const title = $(this).find('h2').text().trim('\n')
            const person = $(this).find('p').text().trim('\n')
            articles.push({
                title,
                person
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))
