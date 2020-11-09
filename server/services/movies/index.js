const express = require('express')
const app = express()
const route = require('./route/movie')
const PORT = 5001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/movies', route)


app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})