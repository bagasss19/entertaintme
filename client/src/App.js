import './App.css';
import React, { } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Movie from './component/Movie'
import Series from './component/Series'
import AddMovie from './component/addmovie'
import AddSeries from './component/addseries'
import Favorite from './component/Favorite'
import EditMovie from './component/editmovie'
import EditSeries from './component/editseries'
import Home from './component/Home.jsx'

const App = () => {
  return (
    <div className="App">
      <Router>
          <Navbar bg="light" expand="lg">
            <Link to="/"><Navbar.Brand>Home</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/getmovie" style={{marginRight : "10px"}}>Movie</Link>
                <Link to="/getseries"style={{marginRight : "10px"}}>Series</Link>
                <Link to="/fav" style={{marginRight : "10px"}}>Favorite</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br></br>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/getmovie" component={Movie} />
            <Route path="/getseries" component={Series} />
            <Route path="/addmovie" component={AddMovie} />
            <Route path="/addseries" component={AddSeries} />
            <Route path="/fav" component={Favorite} />
            <Route path="/movie/:id" children={EditMovie} />
            <Route path="/series/:id" children={EditSeries} />
          </Switch>
      </Router>

    </div>
  );
}

export default App;
