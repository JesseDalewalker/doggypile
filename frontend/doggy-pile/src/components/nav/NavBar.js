import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import DoggyPileAPI from '../../api/DoggyPileAPI';

function NavBar(props) {
  const navigate = useNavigate()

  // helpers
  const logMeOut = async () => {
    const data = await DoggyPileAPI.logout()
    if (data) {
      props.setUsername("")
      navigate("/")
    }
  }

  // render Login/Sign Up navbar if not logged in, else renders rest of navbar items
  const renderItems = () => {
    if (props.username === "") {
      return (
        <div>
          <Navbar bg="dark" variant="light">
            <Nav>
              <Nav.Link as={Link} to="/login"><Button variant="outline-secondary">Login</Button></Nav.Link>
              <Nav.Link as={Link} to="/signup"><Button variant="outline-secondary">Sign Up</Button></Nav.Link>
            </Nav>
          </Navbar>
        </div>
      )
    } 
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
            <Nav.Link as={Link} to={`/profile/${props.username && props.username.user_id}`}>Profile</Nav.Link>
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