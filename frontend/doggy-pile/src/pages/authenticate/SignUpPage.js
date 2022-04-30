import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap"
import DoggyPileAPI from "../../api/DoggyPileAPI";

function SignUpPage() {
  // router params
  const navigate = useNavigate()

  // event handlers
  const handleSignUp = async (event) => {
    event.preventDefault()

    let signupData = {
      username: event.target.elements["username"].value,
      password: event.target.elements["password"].value,
      email: event.target.elements["email"].value,
      first_name: event.target.elements["first-name"].value,
      last_name: event.target.elements["last-name"].value
    }
    console.log("SIGN UP:", signupData)
    const data = await DoggyPileAPI.signup(signupData)

    if (data) {
      navigate(`/login`)
    }
  }


  return (
    <div className="auth-cont">
      <Form onSubmit={ handleSignUp } method="POST">
        <h1 className="form-title">Sign Up</h1>
        <Form.Group as={Row} className="mt-3">
          <Col>
            <Form.Control type="text" name="first-name" placeholder="First Name"/>
          </Col>
          <Col>
            <Form.Control type="text" name="last-name" placeholder="Last Name"/>
          </Col>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control type="text" name="username" placeholder="Username"/>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control type="password" name="password" placeholder="Password"/>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control type="email" name="email" placeholder="Email"/>
        </Form.Group>
        <Form.Group className="mt-3">
        </Form.Group>
        <Button variant="outline-light" className="submit" type="submit">Create Account</Button>
      </Form>
    </div>
  )
}

export default SignUpPage;
