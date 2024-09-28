const express = require('express')
const port = process.env.PORT || 5000
const {engine} = require('express-handlebars')
const fortune = require('./lib/fortune')
const { about, home, serverError, notfound } = require('./lib/handlers')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', home)
app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    // res.send(headers.join('\n'))
    res.send(req.url)
})
app.get('/about', about)
app.use(notfound)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}`)
    })
} else {
    module.exports = app
}