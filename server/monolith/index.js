const express = require('express')
const app = express()
const axios = require('axios')
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/entertainme', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'get',
                url: 'http://localhost:5001/movies'
            })
                .then(data => {
                    console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })
                .catch(err => {
                    return err
                })

        const series =
            await axios({
                method: 'get',
                url: 'http://localhost:5002/tv'
            })
                .then(data => {
                    return data.data
                })
                .catch(err => {
                    return err
                })

        const output = {
            movies, series
        }

        //res.send(output)
        res.status(200).json(output)

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})



app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})