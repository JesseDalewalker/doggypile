import { Navbar, Nav, Button, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import DoggyPileAPI from '../../api/DoggyPileAPI';
import "./NavStyles.css"

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
          <Navbar className='navbar' sticky="top">
            <Navbar.Brand className="m-auto justify-content-start">
              <Link to="/"><img alt="logo" src={require("../../images/DoggyPile-logo.png")} className="logo"/></Link>
            </Navbar.Brand>
            <Container className='justify-content-center'>
            <Nav>
                <Nav.Link as={Link} to="/" className='navbar-item' style={{color:'#797272'}}>Home</Nav.Link>
                <Nav.Link as={Link} to="/about" className='navbar-item' style={{color:'#797272'}}>About</Nav.Link>
                <Nav.Link as={Link} to="/" className='navbar-item' style={{color:'#797272'}}>Contact Us</Nav.Link>
            </Nav>
            </Container>
            <Nav className='m-auto justify-content-end'>
              <Nav.Link as={Link} to="/login" className='d-flex align-items-center navbar-item' style={{color:'#FA9A49' }}>Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" ><Button className='navbar-item signup-btn' style={{color:'#F8F2F2' }}>Sign Up</Button></Nav.Link>
              </Nav>
          </Navbar>
        </div>
      )
    } 
    return (
      <div>
        <Navbar className='navbar' sticky="top">
          <Navbar.Brand className="justify-content-start">
          <Link to="/feed"><img alt="logo" src={require("../../images/DoggyPile-logo.png")} className="logo"/></Link>
          </Navbar.Brand>
          <Container className='justify-content-center'>
            <Nav>
                <Nav.Link as={Link} to="/feed" className='navbar-item' style={{color:'#797272'}}>Feed</Nav.Link>
                <Nav.Link as={Link} to={`/profile/${props.username && props.username.user_id}`} className='navbar-item' style={{color:'#797272'}}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/mappage" className='navbar-item' style={{color:'#797272'}}>Map</Nav.Link>
                <Nav.Link as={Link} to="/calendar" className='navbar-item' style={{color:'#797272'}}>Calendar</Nav.Link>
                <Nav.Link as={Link} to="/doggy101" className='navbar-item' style={{color:'#797272'}}>Doggy101</Nav.Link>
                <Nav.Link as={Link} to="/localUsers" className='navbar-item' style={{color:'#797272'}}>Local Users</Nav.Link>
            </Nav>
          </Container>
          <Nav className='m-auto justify-content-end'>
            <Nav.Link as={Link} to="#" onClick={logMeOut}><Button className='navbar-item signup-btn' style={{color:'#F8F2F2' }}>Log Out</Button></Nav.Link>
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