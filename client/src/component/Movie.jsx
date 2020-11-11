import { useQuery, gql, useMutation, NetworkStatus  } from '@apollo/client'
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import {fav} from './reusable/state'

const GETDATA = gql`
{ 
Movies {
  _id
  title
  overview
  popularity
  poster_path
  tags
}

Series {
  _id
  title
  overview
  popularity
  poster_path
  tags
}

}
`

const DELETE = gql`
mutation deleteMovie($_id : ID) {
    deleteMovie(
        _id : $_id)  
        {   
        _id
        }
    }`



function Movie(props) {
  const [del] = useMutation(DELETE)
  const { loading, error, data, refetch, networkStatus } = useQuery(GETDATA, 
    { notifyOnNetworkStatusChange: true, refetchQueries: [GETDATA], fetchPolicy : "no-cache"})

  if (networkStatus === NetworkStatus.refetch) return <p>Refresh Data ...</p>
  if (loading) return <p>Loading ...</p>
  if (error) return <p>{JSON.stringify(error)}</p>

  const addFav = (input) => {
    let arr = fav()
    let newArr = [...arr, input]
    fav(newArr)
  };

  return (
    <div>
      <img src="https://www.flaticon.com/svg/static/icons/svg/3074/3074767.svg" alt="movie logo" style={{ width: 100 }} />
      {/* <p>{JSON.stringify(data.Movies)}</p> */}
      <div>
      <Link to="/addmovie"><Button variant="btn btn-primary btn-space">Add Movie</Button></Link>
      <Button variant="btn btn-primary btn-space" onClick={(e) => {
        e.preventDefault()
        refetch()
      }}>Refresh Data</Button><br></br><br></br>
      <div className="container">
        <div className="row">
          {data.Movies.map((x, i) =>
            <div className="col-md-3 col-sm-6" key={i}>
              <Card style={{ height: '400px', width: '275px' }}>
               <center><Card.Img variant="top" src={x.poster_path} style={{ width: 275, height : 200}} /></center>

                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>
                    {x.overview}<br></br>
                    {x.popularity}<br></br>
                    {x.tags}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Button variant="btn btn-primary btn-space" onClick={(e) => {
                e.preventDefault()
                const favorite = {
                  title : x.title,
                  overview :x.overview,
                  poster_path : x.poster_path,
                  popularity : x.popularity,
                  tags : x.tags
                }
                addFav(favorite)
              }}>Add to Fav</Button>
              <Link to={`/movie/${x._id}`}><Button variant="btn btn-primary btn-space">Edit</Button></Link>
              <Button variant="btn btn-primary btn-space" onClick={(e) => {
                e.preventDefault()
                let vars = {
                  variables: {
                    _id: x._id
                  }
                }
                console.log(vars, ">>>>>>>>>>Vars")
                del(vars)
                if (error) {
                  console.log(error, "<<<<<<<ini errornya")
                }
                refetch()
              }} >Delete</Button>
              <br></br><br></br>

            </div>
          )}
        </div></div>
        </div>
    </div>
  );
}

export default Movie;
