import DoggyPileAPI from "../../api/DoggyPileAPI";
import { useNavigate, useParams } from "react-router-dom"
import {Form, Button, Stack, Row } from 'react-bootstrap'
import { useEffect, useState } from "react";

// Renders the form for creating/editing User's profile information

function EditPostPage(props) {
  const navigate = useNavigate()
  

  // states
  const [postDetails, setPostDetails] = useState([])
  // params
  const params = useParams()
  console.log("~~~~~~~~~~~~~~", params)
 // Get existing post information from Post to populate field
  const loadPost = async () => {
      const data = await DoggyPileAPI.getItemById("post", params.id)
      setPostDetails(data)
  }
  // effects

  useEffect(() => {
      loadPost()
  }, [])

 
console.log("What am I getting?", postDetails)
  // event handlers
  const handleEditPost = async (event) => {
      event.preventDefault()

      const editData = {
          headline: event.target.elements["headline"].value,
          content: event.target.elements["content"].value
      }

      console.log("SENDING DATA...", editData)
      const dataForEdit = await DoggyPileAPI.editItems("post", postDetails.id, editData)

      if (dataForEdit) {
          console.log("Received DATA: ", postDetails.id, dataForEdit)
          navigate('/feed')
      }
      console.log("Received~~~~~~~~~~~~~~~~~~: ", dataForEdit)
  }

  // render

  return (
    <div className="d-flex justify-content-center">
      <div id="editpost" className="postform-cont">
        <Form onSubmit={ handleEditPost } method="PATCH">
          {/* User's post title */}
          <Form.Group as={Row}>
            <Form.Label column>Title:</Form.Label>
              <Form.Control name="headline" defaultValue={ postDetails.headline } />
          </Form.Group>
          {/* User content area */}
          <Form.Group as={Row}>
            <Form.Label>Content:</Form.Label>
            <Form.Control name="content" as="textarea" rows={6} defaultValue={ postDetails.content } />
          </Form.Group>
          
          <Stack gap={2} className="col-md-5 mx-auto mt-3">
            <Button variant="secondary" type="submit">Update your Bark!</Button>
            <Button variant="outline-secondary" onClick={() => navigate(-1)} >Cancel</Button>
          </Stack>
        </Form>
      </div>
    </div>
  )
}

export default EditPostPage;