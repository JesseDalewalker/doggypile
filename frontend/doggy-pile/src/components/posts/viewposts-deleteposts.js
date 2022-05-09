import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import DoggyPileAPI from "../../api/DoggyPileAPI";
import { Form, Button, Row, Col } from "react-bootstrap"
import CommentRender from "../comments/CommentRender";
import CommentRenderNoButton from "../comments/CommentRenderNoButton";

function PostView(props) {

  // router params

  // state
  const [commentsList, setCommentsList] = useState([])

  // effects
  useEffect(() => {
    loadComments()
  }, [])
  
  const loadComments = async () => {
    const comments = []
    const data = await DoggyPileAPI.getAllItems("comment")
    for (let i=0; i < data.length; i++) {
      if(data[i].post == props.myPost.id) {
        comments.push(data[i])
      }
    }
    setCommentsList(comments ? comments : [])
  }

  // event handlers
  const handleDeletePost = async () => {
    const data = await DoggyPileAPI.deleteItem("post", props.myPost.id) // this is to remove the data from the Django API
    if (data) {
      props.removePost(props.myPost.id) // this is just to remove the data from the parent (nothing to do with the Django API)
    }
  }

  const handleCreateComment = async (event) => {
    event.preventDefault()
    const commentData = {
      comment: event.target.elements["comment"].value,
      post: props.myPost.id,
      user: props.username.user_id
    }
    console.log("SENDING POST DATA...", commentData)

    const data = await DoggyPileAPI.createItems("comment", commentData)

    if (data) {
      console.log("RECEIVED DATA", data)
      setCommentsList([...commentsList, commentData])
      loadComments()
    }
  }

  const removeComment = (deletedCommentId) => {
    const newCommentsList = commentsList.filter((comment) => {
      return comment.id !== deletedCommentId
    })
    setCommentsList(newCommentsList)
  }

  const showEditAndDeleteButton = () => {
    if (props.username.user_id === props.myPost.user.id) {
      return (
        <div>
         <Link to={`/post/${props?.myPost?.id}/`}> <button className="btn-update">Edit</button></Link>
        <button className="btn-delete" onClick={ handleDeletePost }>Delete</button>
        </div>
      )
    }
  }

  const showRemoveCommentButton = () => {
    if (props.username.user_id === props.myPost.user.id) {
      return (
        <div>
        <CommentRender commentsList={commentsList} removeComment={removeComment}/>
        </div>
      )
    } return (
      <div>
        <CommentRenderNoButton commentsList={commentsList} />
      </div>
    )
  }
console.log("Main USER:", props.username.user_id, "POST USER:", props.myPost.user.id)

  

return (
  <section class="day-events new">

    <div class="wrapper">
      <div class="day-card">
        <input type="checkbox" id={ props.myPost.id} class="more" aria-hidden="true"/>
        <div class="content">
          <div class="front" >
        <div class="inner">
          <h1>{ props.myPost.headline } <span className="author-txt">by {props.myPost.user.username }</span></h1>
          <p className="post-txt">{ props.myPost.content }</p>                
          <label for={ props.myPost.id} class="button-56 mt-5" aria-hidden="true">
            Go to Comments
          </label>
        </div>
          </div>
          <div class="back">
            <div class="inner">
              { showEditAndDeleteButton() }
              <div className="description">
                {/* Rendering existing comments */}
                { showRemoveCommentButton() } 

                {/* Form to write a comment */}
                <Form onSubmit={ handleCreateComment }>
                  <Row className="comment-cont">
                    <Col sm={9}>
                      <Form.Control as="textarea" rows={3} name="comment" className="comment-box"/>
                    </Col>
                    <Col>
                      <Button type="submit" variant="secondary" className="mt-3 mb-3 write-btn submit-cmt">Submit Comment</Button>
                    </Col>
                  </Row>
                </Form>    
              </div>
              <div class="location headline-txt">{ props.myPost.headline }</div>        
              {/* Back to post button */}
              <label for={ props.myPost.id} class="button-56 return-btn" aria-hidden="true">
                Back to Post
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

</section>
  )
}
export default PostView;
           