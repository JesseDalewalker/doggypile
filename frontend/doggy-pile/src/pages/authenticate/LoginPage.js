import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

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
      props.setUsername(data)
      navigate("/")
    }
  }

  return (
    <div>
      <h1 className="form-title">Login to your account</h1>
      <Form onSubmit={ handleLogin } method="POST">
        <Form.Group className="mt-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" placeholder="Username"/>
        </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password"/>
          </Form.Group>
        <Button variant="outline-primary" className="submit" type="submit">Submit</Button>
      </Form> 
    </div>
  )
}

export default LoginPage;
