const express = require('express')
const app = express()
const route = require('./route/series')
const PORT = 5002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/tv', route)


app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})