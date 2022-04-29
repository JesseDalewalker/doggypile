import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Nav className="justify-content-center">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;