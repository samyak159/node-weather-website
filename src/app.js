const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'You are safe',
        name:'Samyak'
    })})

app.get('/about', (req, res) => {
    res.render('about', {
        Text: 'This is about page',
        name: 'Samyak'
    })})

app.get('/index', (req, res) => {
    res.render('index', {
        name: 'Samyak'
    })})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a valid address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude,(error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
        })
    })
    // res.send({
    //     place: 'Rourkela',
    //     weather: 'Its raining',
    //     address: req.query.address
    // })
})
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('error404',{
        errorMessage:'Help Article not found',
        name:'Samyak'
    })})

app.get('*', (req, res) => {
    res.render('error404', {
        errorMessage: 'Error Page',
        name: 'Gulu'
    })})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})