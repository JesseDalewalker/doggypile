import { Row, Col, Button, Card } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel'
import { Link } from "react-router-dom";
import './HomeStyles.css'
// SVGs
import Map from '../../images/map-icon.svg'
import Post from '../../images/grouppost-icon.svg'
import Calendar from '../../images/calendar-icon.svg'

// What a visitor will see first before they are logged in/signed up
function LandingPage() {  
  return (
    <div>
    <div className="d-flex justify-content-center">
      {/* Header items */}
      <Row className="header-cont">
        <Col className="header-text">
          <h1 align="left" className="action-txt">The perfect website to fulfill your dog's <span style={{ color:'#E96E29'}}>social needs</span></h1>
          <p align="left" className="header-sub">Get connected with other dog owners. Find local dog parks and check in our interactive map.</p>
          <Link to="/signup"><Button className="navbar-item signup-btn join">Join Today!</Button></Link>
        </Col>
        <Col>
          <img src={require('../../images/header-image.png')} alt="Dog phone" className="header-img"/>
        </Col>
      </Row>
    </div>
    {/* Features title */}
    <div className="d-flex justify-content-center mt-5">
      <Row className="header-cont">
          <Col>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-left"/>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="sub-header" id='site-features'>Our Site Features</h1>
          </Col>
          <Col>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-right"/>
          </Col>
        </Row>
      </div>
      {/* Features cards */}
      <div className="d-flex justify-content-center">
        <Row>
          <Col>
            <Card className="border-0 m-5 feature">
              <Card.Img variant="top" src={Map} className="feature-icon"/>
              <Card.Body>
                <Card.Title>Interactive Map</Card.Title>
                <Card.Text>Found or lost a dog? Spot an aggressive dog? Create a marker on our map to notify others or check in at your local dog park.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="border-0 m-5 feature">
              <Card.Img variant="top" src={Post} className="feature-icon"/>
              <Card.Body>
                <Card.Title>User Feed</Card.Title>
                <Card.Text>Check out posts created by other dog owners. You can never have enough pet pictures!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="border-0 m-5 feature">
              <Card.Img variant="top" src={Calendar} className="feature-icon"/>
              <Card.Body>
                <Card.Title>Organize your schedule</Card.Title>
                <Card.Text>Need to make sure you stay on top of your dog's care? Want to schedule playdates? Our site's calendar can take care of that!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      {/* Testimonials */}
      <div className="d-flex justify-content-center mt-5">
      <Row className="header-cont">
          <Col>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-left"/>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="sub-header">Testimonials</h1>
          </Col>
          <Col>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-right"/>
          </Col>
        </Row>
      </div>

      {/* Carousel testimonials */}
      <Carousel variant="dark">
        <Carousel.Item >
        <div className="carousel-bg"><img src={require('../../images/depp.jpg')} className="carousel-img" /></div>
          <Carousel.Caption>
          <h3>Johnny Depp</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna. Nunc scelerisque viverra mauris in. Duis ut diam quam nulla. Mauris commodo quis imperdiet massa. Consectetur purus ut faucibus pulvinar elementum integer enim. Tempor orci eu lobortis elementum. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Massa enim nec dui nunc. Diam sit amet nisl suscipit adipiscing. Amet cursus sit amet dictum sit amet justo donec. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Tellus id interdum velit laoreet. Feugiat in fermentum posuere urna. Sit amet nulla facilisi morbi. Blandit massa enim nec dui nunc mattis enim ut tellus.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-bg"><img src={require('../../images/reeves.jpg')} className="carousel-img" /></div>
          <Carousel.Caption>
          <h3>Keanu Reeves</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna. Nunc scelerisque viverra mauris in. Duis ut diam quam nulla. Mauris commodo quis imperdiet massa. Consectetur purus ut faucibus pulvinar elementum integer enim. Tempor orci eu lobortis elementum. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Massa enim nec dui nunc. Diam sit amet nisl suscipit adipiscing. Amet cursus sit amet dictum sit amet justo donec. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Tellus id interdum velit laoreet. Feugiat in fermentum posuere urna. Sit amet nulla facilisi morbi. Blandit massa enim nec dui nunc mattis enim ut tellus.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className="carousel-bg"><img src={require('../../images/mom.jpg')} className="carousel-img" /></div>
          <Carousel.Caption>
          <h3>My Mom</h3>
          <p>What is this? Why you not a doctor yet?</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default LandingPage;