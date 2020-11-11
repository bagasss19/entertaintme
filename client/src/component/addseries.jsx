import React, { useState } from 'react'
import { withRouter } from "react-router-dom"
import { gql, useMutation } from '@apollo/client'
// import client from '../index'

const ADD = gql`
mutation addSeries($title: String!,$overview: String!,$poster_path : String!,$popularity : Float!,$tags : [String]!) {
    addSeries(
        title: $title,
        overview: $overview,
        popularity: $popularity,
        poster_path: $poster_path,
        tags: $tags)  {   
        title
        overview
        popularity
        poster_path
        tags
        }
    }`

const AddSeries = (props) => {
    const [title, settitle] = useState("")
    const [overview, setoverview] = useState("")
    const [poster_path, setposter_path] = useState("")
    const [popularity, setpopularity] = useState(0)
    const [tags, settags] = useState([])

    const [add, {loading, error}] = useMutation(ADD)

    function updateTags(value) {
        const str = value
        const updatedArray = str.split(',')
        settags(updatedArray)
    }

    return (
        <div>
            <form onSubmit={ (e) => {
                e.preventDefault()
                let vars = {
                    variables: {
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                };
                add(vars)
                if (error) {
                    console.log(error, "<<<<<<<ini errornya")
                }
                props.history.push('/getseries')
                const input = {
                    title, overview, poster_path, popularity, tags
                }
                console.log(input);


            }}>
                <label>Title:</label><br></br>
                <input type="text" name="title" onChange={e => settitle(e.target.value)} /><br></br>

                <label>Overview:</label><br></br>
                <textarea name="overview" onChange={e => setoverview(e.target.value)}></textarea><br></br>

                <label>Poster Path:</label><br></br>
                <input type="text" name="poster_path" onChange={e => setposter_path(e.target.value)} /><br></br>

                <label>Popularity:</label><br></br>
                <input type="number" name="popularity" min="0" step="0.01" onChange={e => setpopularity(Number(e.target.value))} /><br></br>

                <label>Tags:</label><br></br>
                <input type="tags" placeholder="use comma (,) to separate" name="created" onChange={e => updateTags(e.target.value)} /><br></br>

                <input type="submit" disabled={loading} value="Submit" />
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

export default withRouter(AddSeries)