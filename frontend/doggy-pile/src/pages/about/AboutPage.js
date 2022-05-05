import { Row, Col } from "react-bootstrap"
import './AboutStyles.css'

function AboutPage() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="about-details">
          <h1>Meet Our Team!</h1>
          <p className='mt-4 mb-5'>DoggyPile was created with the vision of maximizing the social benefits for our furry pals. Our members  are a part of Code Platoon’s Quebec cohort and each of us hail from different places, bringing together unique ideas that make up this website. </p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
      <Row className="about">
        <Col>
          <img src={require('../../images/jenni.JPG')} className="about-img"/>
          <h4 className="member-name">Jennilee Toctocan</h4>
        </Col>
        <Col>
          <img src={require('../../images/reeves.jpg')} className="about-img"/>
          <h4>John Price</h4>
        </Col>
      </Row>
      </div>
      <div className="d-flex justify-content-center">
      <Row className="about">
        <Col>
          <img src={require('../../images/depp.jpg')} className="about-img"/>
          <h4>Jessi Dalewalker</h4>
        </Col>
        <Col>
          <img src={require('../../images/corgi.png')} className="about-img"/>
          <h4>Jennifer Isobe</h4>
        </Col>
      </Row>
      </div>
      <div className="d-flex justify-content-center">
      <Row className="about">
        <Col>
          <img src={require('../../images/signup-dog.png')} className="about-img"/>
          <h4>Adam Cox</h4>
        </Col>
      </Row>
      </div>
    </div>
  )
}

export default AboutPage;