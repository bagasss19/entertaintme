import { fav } from './reusable/state'
import { Card } from 'react-bootstrap'
function Favorite() {
  return (
    <div>
      <h3>Favorite Movies and Series</h3>
      {/* <p>{JSON.stringify(fav())}</p> */}
      <div className="container">
        <div className="row">
          {fav().map((x, i) => (
            <div className="col-md-3 col-sm-6">
              <Card key={i} style={{ height: '400px', width: '275px' }}>
                <center><Card.Img variant="top" src={x.poster_path} style={{ width: 275, height: 200 }} /></center>

                <Card.Body>
                  <Card.Title>{x.title}</Card.Title>
                  <Card.Text>
                    {x.overview}<br></br>
                    {x.popularity}<br></br>
                    {x.tags}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br></br><br></br><br></br>
            </div>))}
        </div></div>
    </div>
  );
}

export default Favorite
