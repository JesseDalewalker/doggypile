import { Form, Row, Col, Button } from "react-bootstrap"
import './ContactStyles.scss'

function ContactUsPage() {
  return (
    <div>
      <header className="contact-header">
        <h1>Send us a bark!</h1>
        <h5>We'd love to hear from you</h5>
      </header>
      <div className="d-flex justify-content-center">
        <div className="form-contact">
          <h4>Contact Form</h4>
          <Form>
            <Row className="my-4">
              <Col>
                <Form.Control placeholder="First Name" className="contact-field"/>
              </Col>
              <Col>
                <Form.Control placeholder="Last Name" className="contact-field"/>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Form.Control type="email" placeholder="Your Email" className="contact-field"/>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Form.Control rows={6} as="textarea" placeholder="Enter your message here" className="contact-field"/>
              </Col>
            </Row>
            <Button className="navbar-item signup-btn mt-4">Submit Form</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage;