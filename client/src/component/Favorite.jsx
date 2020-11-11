import {fav} from './reusable/state'

function Favorite() {
    return (
      <div>
        <h3>Your Deck</h3>
        <p>{JSON.stringify(fav())}</p>
        {/* <p> {JSON.stringify(favPokemon)}</p> */}
        {/* <div className="container">
                <div className="row">
                    {favPokemon.map((pokemon) => (
                        <div className="col-md-3 col-sm-6">
                            <Card>
                                <Card.Img variant="top" src={pokemon} />
                            </Card><br></br>
                            <br></br><br></br>

                        </div>))}
                </div></div> */}
      </div>
    );
  }

export default Favorite
