import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import DoggyPileAPI from '../../api/DoggyPileAPI';

function NavBar(props) {
  const navigate = useNavigate()
  // console.log("USERNAME", props.username)

  // helpers
  const logMeOut = async () => {
    const data = await DoggyPileAPI.logout()
    if (data) {
      props.setUsername("")
      navigate("/")
    }
  }

  // render
  const renderItems = () => {
    if (props.username === "") {
      return (
        <div>
          <NavBar className="nav-bar">
            <Nav>
              <Nav.Link as={Link} to="/login"><Button variant="outline-secondary">Login</Button></Nav.Link>
              <Nav.Link as={Link} to="/signup"><Button variant="outline-secondary">Sign Up</Button></Nav.Link>
            </Nav>
          </NavBar>
        </div>
      )
    } 
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav className="justify-content-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/mappage">Map</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={logMeOut}><Button variant="outline-secondary">Logout</Button></Nav.Link>
          </Nav>
        </Navbar>
      </div>
    )
  }

  return (
    <div>
      { renderItems() }
    </div>
  )
}

export default NavBar;