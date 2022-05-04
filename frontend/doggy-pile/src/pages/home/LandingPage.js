import { Row, Col, Button } from "react-bootstrap"
import './HomeStyles.css'

// What a visitor will see first before they are logged in/signed up
function LandingPage() {  
  return (
    <div className="d-flex justify-content-center">
      <Row className="header-cont">
        <Col className="header-text">
          <h1 align="left">The perfect website to fulfill your dog's social needs</h1>
          <p align="left">Get connected. Find local dog parks and check in our interactive map.</p>
          <Button>Join Today!</Button>
        </Col>
        <Col>
          <img src={require('../../images/header-image.png')} alt="Dog phone" className="header-img"/>
        </Col>
      </Row>
    </div>
  )
}

export default LandingPage;