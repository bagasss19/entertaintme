const express = require('express')
const app = express()
const axios = require('axios')
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/entertaintme', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'get',
                url: 'http://localhost:5001/movies'
            })
                .then(data => {
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
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

app.post('/entertaintme/movie', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'post',
                url: 'http://localhost:5001/movies',
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })
                .catch(err => {
                    return err
                })

        res.status(201).json(movies)

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})

app.delete('/entertaintme/movie/:id', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'delete',
                url: `http://localhost:5001/movies/${req.params.id}`,
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    console.log("BERHASIL DELETE")
                })
                .catch(err => {
                    return err
                })

        res.status(200).json({ msg: "sucessfully deleted" })

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})

app.put('/entertaintme/movie/:id', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'put',
                url: `http://localhost:5001/movies/${req.params.id}`,
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })
                .catch(err => {
                    return err
                })

        res.status(200).json(movies)

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})

app.post('/entertaintme/series', async (req, res) => {
    try {
        const series =
            await axios({
                method: 'post',
                url: 'http://localhost:5002/tv',
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })
                .catch(err => {
                    return err
                })

        res.status(201).json(series)

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})

app.delete('/entertaintme/series/:id', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'delete',
                url: `http://localhost:5002/tv/${req.params.id}`,
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    console.log("BERHASIL DELETE")
                })
                .catch(err => {
                    return err
                })

        res.status(200).json({ msg: "sucessfully deleted" })

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})

app.put('/entertaintme/series/:id', async (req, res) => {
    try {
        const movies =
            await axios({
                method: 'put',
                url: `http://localhost:5002/tv/${req.params.id}`,
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tags: req.body.tags
                }
            })
                .then(data => {
                    //console.log(req.body,"<<<<<<<<<<<<masuk sini")
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })
                .catch(err => {
                    return err
                })

        res.status(200).json(movies)

    } catch (err) {
        res.status(400).json({ msg: `${err}` })
        console.log(err, 'masuk di eror!!!!!!!')
    }

})



app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})