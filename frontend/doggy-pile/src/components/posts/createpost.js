import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate } from "react-router-dom"
import {Form, Button, Stack, Row } from 'react-bootstrap'

// Renders the form for creating/editing User's profile information

function CreatePostPage(props) {
  const navigate = useNavigate()

  // event handlers
  const handleCreatePost = async (event) => {
      event.preventDefault()

      const postData = {
          user: props.username.user_id,
          headline: event.target.elements["headline"].value,
          content: event.target.elements["content"].value
      }

      const dataForPost = await DoggyPileAPI.createItems("post", postData)

      if (dataForPost) {
          console.log("Received DATA: ", dataForPost)
          navigate('/feed')
      }
      console.log("Received~~~~~~~~~~~~~~~~~~: ", props, dataForPost)
  }

  // render

  return (
    <div>
      <Form onSubmit={ handleCreatePost }>
        {/* User's post title */}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Title:</Form.Label>
            <Form.Control name="headline" placeholder="Doggy Headliner" />
        </Form.Group>
        {/* User content area */}
        <Form.Group as={Row}>
          <Form.Label>Content:</Form.Label>
          <Form.Control name="content" as="textarea" rows={6} placeholder="What is your doggy update?" />
        </Form.Group>
        
        <Stack gap={2} className="col-md-5 mx-auto mt-3">
          <Button variant="secondary" type="submit">Bark your post out!</Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} >Cancel</Button>
        </Stack>
      </Form>
    </div>
  )
}

export default CreatePostPage;