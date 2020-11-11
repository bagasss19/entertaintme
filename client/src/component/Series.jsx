import { useQuery, gql, useMutation,NetworkStatus } from '@apollo/client'
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
mutation deleteSeries($_id : ID) {
    deleteSeries(
        _id : $_id)  
        {
            _id
        }
    }`

function Series(props) {
  const [del] = useMutation(DELETE)
  const { loading, error, data, refetch, networkStatus } = useQuery(GETDATA, { notifyOnNetworkStatusChange: true})

  if (networkStatus === NetworkStatus.refetch) return <p>Refresh Data ...</p>
  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error cuy</p>

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
      <Link to="/addseries"><Button variant="btn btn-primary btn-space">Add Series</Button></Link><br></br><br></br>
      <div className="container">
        <div className="row">
          {data.Series.map((x, i) =>
            <div className="col-md-3 col-sm-6" key={i}>
              <Card  style={{ height: '300px' }}>
              <center><Card.Img variant="top" src={"https://www.flaticon.com/svg/static/icons/svg/3074/3074767.svg"} style={{ width: 100 }} /></center>

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
              <Link to={`/series/${x._id}`}><Button variant="btn btn-primary btn-space">Edit</Button></Link>
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

export default Series;
