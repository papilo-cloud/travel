const express = require('express')
const port = process.env.PORT || 5000
const {engine} = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()


    
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/about', (req, res) => {
    
    res.render('about', {fortune: fortune.getFortune()})
})
app.use((req, res) => {
    res.status(404)
    res.render('404')
})
.listen(port)