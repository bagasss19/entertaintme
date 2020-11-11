const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const typeDefs = gql`
type Movie {
    _id : ID
    title: String!
    overview: String!
    poster_path : String!
    popularity : Float!
    tags : [String]!
  }

type Ser {
    _id : ID!
    title: String!
    overview: String!
    poster_path : String!
    popularity : Float!
    tags : [String]!
  }

  type Query {
    Movies: [Movie]
    MovieID(_id : ID) : Movie
    Series : [Ser]
    SerID(_id : ID) : Ser
  }

type Mutation {
    addMovie(
        title: String!
        overview: String!
        poster_path : String!
        popularity : Float!
        tags : [String]!) : Movie

    addSeries(
        title: String!
        overview: String!
        poster_path : String!
        popularity : Float!
        tags : [String]!) : Ser

    editMovie(
        _id : ID
        title: String!
        overview: String!
        poster_path : String!
        popularity : Float!
        tags : [String]!) : Movie

    editSeries(
        _id : ID
        title: String!
        overview: String!
        poster_path : String!
        popularity : Float!
        tags : [String]!) : Ser

    deleteMovie(
        _id : ID) : Movie
    
    deleteSeries(
        _id : ID) : Ser
}


`

const resolvers = {
    Query: {
        Movies: function () {
            return axios({
                method: 'get',
                url: 'http://localhost:5001/movies'
            })
                .then(data => {
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })

        },

        MovieID: function (_, args) {
            console.log(args, "<<<<<<<<<<args")
            return axios({
                method: 'get',
                url: 'http://localhost:5001/movies/' + args._id
            })
                .then(data => {
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })

        },

        Series: function () {
            return axios({
                method: 'get',
                url: 'http://localhost:5002/tv'
            })
                .then(data => {
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })

        },

        SerID: function (_, args) {
            console.log(args, "<<<<<<<<<<args")
            return axios({
                method: 'get',
                url: 'http://localhost:5002/tv/' + args._id
            })
                .then(data => {
                    // console.log(data, "<<<<<<<<<<<dataaaaaaaaa")
                    return data.data
                })

        }
    },

    Mutation: {
        addMovie(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'post',
                url: 'http://localhost:5001/movies',
                data: {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }
            })
                .then(data => {
                    console.log(data.data, "<<<<<<<<<<<dataaaaaaaaa")
                    redis.del('movies')
                    return data.data[0]
                })
                .catch(err => {
                    return err
                })
        },

        addSeries(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'post',
                url: 'http://localhost:5002/tv',
                data: {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }
            })
                .then(data => {
                    //console.log(data.data, "<<<<<<<<<<<dataaaaaaaaa")
                    redis.del('series')
                    return data.data[0]
                })
                .catch(err => {
                    return err
                })
        },

        editMovie(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'put',
                url: 'http://localhost:5001/movies/' + args._id,
                data: {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }
            })
                .then(data => {
                    console.log(data.data, "<<<<<<<<<<<dataaaaaaaaa")
                    redis.del('movies')
                    return data.data[0]
                })
                .catch(err => {
                    return err
                })
        },

        editSeries(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'put',
                url: 'http://localhost:5002/tv/' + args._id,
                data: {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }
            })
                .then(data => {
                    //console.log(data.data, "<<<<<<<<<<<dataaaaaaaaa")
                    redis.del('series')
                    return data.data[0]
                })
                .catch(err => {
                    return err
                })
        },

        deleteMovie(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'delete',
                url: 'http://localhost:5001/movies/' + args._id,
            })
                .then(data => {
                    redis.del('movies')
                    return data
                })
                .catch(err => {
                    return err
                })
        },

        deleteSeries(_, args) {
            // console.log(args,"<<<<<<<<<<ARGS NIH")
            return axios({
                method: 'delete',
                url: 'http://localhost:5002/tv/' + args._id,
            })
                .then(data => {
                    redis.del('series')
                    return data
                })
                .catch(err => {
                    return err
                })
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers })

server.listen()
    .then(({ url }) => {
        console.log(`apollo jalan di ${url}`)
    })