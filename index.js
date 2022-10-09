const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://kristianemil.dk/contact'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const contact = []

        $('.image-caption', html).each(function() {
            const info = $(this).text()
            contact.push({
                info
            })
        })

        $('.image-caption', html).each(function() {
            const links = $(this).find('a').attr('href')
            contact.push({
                links
            })
        })

        $('#block-179f8c9da7aa428c1198', html).each(function() {
            const footer = $(this).text().trim('\n')
            contact.push({
                footer
            })
        })
        console.log(contact)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))