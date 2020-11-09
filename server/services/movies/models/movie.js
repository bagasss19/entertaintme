const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url, { useUnifiedTopology: true })
const Redis = require('ioredis')
const redis = new Redis()
client.connect()

const db = client.db('test')
var ObjectId = require('mongodb').ObjectId


class Model {
    static async read(req, res) {
        try {
            const cache = await redis.get('movies')
            if (cache) {
                console.log("<<<<<<<<<<masuk ke redis")
                return JSON.parse(cache)
            } else {
                const movies = db.collection("movies")
                const movie = await movies.find({}).toArray()
                redis.set('movies',JSON.stringify(movie))
                // console.log(cache ,"<<<<<<<<pisahhh", JSON.stringify(movie), "<<<<<<<<<<<<<<,vhghvu")
                console.log("<<<<<<<<<<masuk ke movies")
                return movie
            }
            

        } catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async create(req, res) {
        try {
            const movies = db.collection("movies")
            const data = await movies.insertOne({
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            })
            console.log(req.body, "<<<<<<<BODYYYY")
            redis.del('movies')
            return data
        } catch (err) {
            return err
        }
    }

    static async update(req, res) {
        try {
            const movies = db.collection("movies")
            const movie = { _id: ObjectId(req.params.id) }
            const data = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }

            const result = await movies.replaceOne(movie, data)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            redis.del('movies')
            return result
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }

    static async delete(req, res) {
        try {
            const movies = db.collection("movies")
            const movie = { _id: ObjectId(req.params.id) }
         
            redis.del('movies')
            const result = await movies.deleteOne(movie)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }
}

module.exports = Model