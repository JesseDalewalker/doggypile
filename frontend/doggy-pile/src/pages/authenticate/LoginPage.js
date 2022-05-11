import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import './AuthenStyles.css'

function LoginPage(props) {
  // router params
  const navigate = useNavigate()

  // event handlers
  const handleLogin = async (event) => {
    event.preventDefault()

    let loginData = {
      username: event.target.elements["username"].value,
      password: event.target.elements["password"].value
    }
    const data = await DoggyPileAPI.login(loginData)
    
    if (data) {
      localStorage.setItem('username', JSON.stringify(data))
      props.setUsername(data)
      navigate("/feed")
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Row className="login-cont">
        <Col sm={6}>
          <img src={require('../../images/login-dog.png')} alt="Login doggo" className="login-doggo"/>
        </Col>
        <Col sm={4}>
          <h3 className="form-title">Welcome back!</h3>
          <p className="sub-text">Login to continue to our site</p>
          <Form onSubmit={ handleLogin } method="POST">
            <Form.Group className="my-3">
              <Form.Control type="text" name="username" placeholder="Username" className="input-field"/>
            </Form.Group>
              <Form.Group className="my-3">
                <Form.Control type="password" name="password" placeholder="Password" className="input-field"/>
              </Form.Group>
            <Button className="edit-btn submit" type="submit">Submit</Button>
          </Form>
        </Col> 
      </Row>
    </div>
    
  )
}

export default LoginPage;
