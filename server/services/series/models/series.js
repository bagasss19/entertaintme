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
            const cache = await redis.get('series')
            if (cache) {
                console.log("<<<<<<<<<<masuk ke redis")
                return JSON.parse(cache)
            } else {
                const series = db.collection("series")
                const ser = await series.find({}).toArray()
                redis.set('series',JSON.stringify(ser))
                // console.log(cache ,"<<<<<<<<pisahhh", JSON.stringify(ser), "<<<<<<<<<<<<<<,vhghvu")
                console.log("<<<<<<<<<<masuk ke serrrrrr")
                return ser
            }

        } catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async create(req, res) {
        try {
            const series = db.collection("series")
            const data = await series.insertOne({
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            })
            console.log(req.body, "<<<<<<<BODYYYY")
            redis.del('series')
            return data
        } catch (err) {
            return err
        }
    }

    static async update(req, res) {
        try {
            const series = db.collection("series")
            const ser = { _id: ObjectId(req.params.id) }
            const data = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }

            const result = await series.replaceOne(ser, data)
            redis.del('series')
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            return result
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }

    static async delete(req, res) {
        try {
            const series = db.collection("series")
            const ser = { _id: ObjectId(req.params.id) }

            redis.del('series')
            const result = await series.deleteOne(ser)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }
}

module.exports = Model