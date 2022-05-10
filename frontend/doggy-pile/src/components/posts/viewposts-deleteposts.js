import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import DoggyPileAPI from "../../api/DoggyPileAPI";
import { Form, Button, Row, Col, OverlayTrigger, Popover, ListGroup } from "react-bootstrap"
import CommentRender from "../comments/CommentRender";
import CommentRenderNoButton from "../comments/CommentRenderNoButton";
import "./PostFormStyles.scss"

import Edit from '../../images/edit-icon.svg'
import Delete from '../../images/delete-icon.svg'

function PostView(props) {

  // router params

  // state
  const [commentsList, setCommentsList] = useState([])
  const [userProfile, setUserProfile] = useState([])

  // effects
  useEffect(() => {
    loadComments()
    loadUserProfile()
  }, [])
  
  const loadUserProfile = async () => {
    const data = await DoggyPileAPI.getAllItems("user_profile")
    if (data) {
      setUserProfile(data ? data : [])
    }
  }

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
        <OverlayTrigger 
        trigger="click"
        key="bottom" 
        placement="bottom"
        overlay={
          <Popover className="more-popover">
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to={`/post/${props?.myPost?.id}/`} className="list-more-item"><img src={Edit} alt="" className="see-more-icons"/> Edit</ListGroup.Item>
              <ListGroup.Item action onClick={handleDeletePost}className="list-more-item"><img src={Delete} alt="" className="see-more-icons"/> Delete</ListGroup.Item>
            </ListGroup>
          </Popover>
        }>
         <Button className="d-flex align-items-center justify-content-center see-more-btn">...</Button>
        </OverlayTrigger>
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

  const postPicRender = () => {
      for (let i=0; i < userProfile.length; i++) {
        for (let k = 1; k < userProfile.length; k++) {
          if (userProfile[i].id.id === props.myPost.user.id) {
            return (<>
               <img className="post-image" src={userProfile[i] && userProfile[i].profile_pic} alt="" />
            </>)
  } else if (userProfile[k].id.id === props.myPost.user.id) {
    return (<>
      <img className="post-image" src={userProfile[k] && userProfile[k].profile_pic} alt="" />
   </>)
  } console.log("CHECK User:", userProfile[k].profile_pic, "CHECK POST:", props.myPost.user.id)
        }
      }
    }
  

return (
  <section className="day-events new">

    <div className="wrapper">
      <div className="day-card">
        <input type="checkbox" id={ props.myPost.id} className="more" aria-hidden="true"/>
        <div className="content">
          <div className="front" >
        <div className="inner">
          { postPicRender() }
          <Link target="_blank" to={`/profile/${props.myPost.user.id}`} className="author-txt">{props.myPost.user.username }</Link>
          <h1 className="headline">{ props.myPost.headline }</h1>
          <p className="post-txt">{ props.myPost.content }</p>                
          <label htmlFor={ props.myPost.id} className="button-56 mt-5" aria-hidden="true">
            Go to Comments
          </label>
        </div>
          </div>
          <div className="back">
            <div className="inner">
              { showEditAndDeleteButton() }
              <div className="description">
                {/* Rendering existing comments */}
                { showRemoveCommentButton() } 
                <hr/>
                {/* Form to write a comment */}
                <Form onSubmit={ handleCreateComment }>
                  <Row className="comment-cont">
                    <Col sm={9}>
                      <Form.Control as="textarea" rows={3} name="comment" className="comment-box"/>
                    </Col>
                    <Col>
                      <Button type="submit" variant="secondary" className="mt-3 mb-3 submit-cmt">Submit Comment</Button>
                    </Col>
                  </Row>
                </Form>    
              </div>
              <div className="location headline-txt">{ props.myPost.headline }</div>        
              {/* Back to post button */}
              <label htmlFor={ props.myPost.id} className="button-56 return-btn" aria-hidden="true">
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