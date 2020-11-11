import React, { useState } from 'react'
import { useParams, withRouter } from "react-router-dom"
import { useQuery, gql, useMutation} from '@apollo/client'
// import client from '../index'
const SERIESID = gql`
query SerId($_id : ID){ 
    SerID(_id : $_id) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}`


const EDIT = gql`
mutation editSeries($_id : ID, $title: String!,$overview: String!,$poster_path : String!,$popularity : Float!,$tags : [String]!) {
    editSeries(
        _id : $_id
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

const EditSeries = (props) => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(SERIESID, {
        variables: { _id: id },
    })
    console.log(id, "<<<<<<<<<<<<<<<<,DATAAAAAAAA");
    const [edit] = useMutation(EDIT)
    const [title, settitle] = useState("")
    const [overview, setoverview] = useState("")
    const [poster_path, setposter_path] = useState("")
    const [popularity, setpopularity] = useState(0)
    const [tags, settags] = useState([])

    if (loading) return <p>Loading ...</p>
    if (error) return <p>{JSON.stringify(error)}</p>

    function updateTags(value) {
        const str = value
        const updatedArray = str.split(',')
        settags(updatedArray)
    }

    return (
        <div>
            {/* <p>{JSON.stringify(id)}</p>
            <p>{JSON.stringify(data)}</p> */}
            <form onSubmit={(e) => {
                e.preventDefault()
                let vars = {
                    variables: {
                        _id : id,
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                };
                edit(vars)
                props.history.push('/')
                const input = {
                    title, overview, poster_path, popularity, tags
                }
                console.log(input);
            }}>
                <label>Title:</label><br></br>
                <input type="text" name="title"defaultValue={data.SerID.title} onChange={e => settitle(e.target.value)} /><br></br>

                <label>Overview:</label><br></br>
                <textarea name="overview" defaultValue={data.SerID.overview} onChange={e => setoverview(e.target.value)}></textarea><br></br>

                <label>Poster Path:</label><br></br>
                <input type="text" name="poster_path" defaultValue={data.SerID.poster_path} onChange={e => setposter_path(e.target.value)} /><br></br>

                <label>Popularity:</label><br></br>
                <input type="number" name="popularity" defaultValue={data.SerID.popularity} min="0" step="0.01" onChange={e => setpopularity(Number(e.target.value))} /><br></br>

                <label>Tags:</label><br></br>
                <input type="tags" defaultValue={data.SerID.tags} placeholder="use comma (,) to separate" name="created" onChange={e => updateTags(e.target.value)} /><br></br>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default withRouter(EditSeries)