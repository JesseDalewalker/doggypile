import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import DoggyPileAPI from "../../api/DoggyPileAPI";
import { Form, Button } from "react-bootstrap"
import CommentRender from "../comments/CommentRender";

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

return (
<section class="day-events new">

    <div class="wrapper">
      <div class="day-card">
        <input type="checkbox" id="card1" class="more" aria-hidden="true"/>
   <div class="content">
    <div class="front" >
     <div class="inner">
        <h2>{ props.myPost.headline }</h2>
                        
         <label for="card1" class="button" aria-hidden="true">
                               Details
                           </label>
                       </div>
                   </div>
                   <div class="back">
                       <div class="inner">
                           
                           
                           <div class="description">
                               <p>{ props.myPost.content }</p>
                               <Link to={`/post/${props?.myPost?.id}/`}> <button className="btn-update">EDIT</button></Link><br/>
                               <button className="btn-delete" onClick={ handleDeletePost }>DELETE</button>
                               {/* Rendering existing comments */}
                               <CommentRender commentsList={commentsList} removeComment={removeComment}/>

                               {/* Form to write a comment */}
                               <div>
                                  <Form onSubmit={ handleCreateComment }>
                                    <Form.Control as="textarea" rows={1} name="comment" />
                                    <Button type="submit" variant="secondary" className="mt-3 mb-3">Submit Comment</Button>
                                  </Form>
                               </div>
                           </div>

                           <div class="location">{ props.myPost.headline }</div>
                           
                           <label for="card1" class="button return" aria-hidden="true">
                               <i class="fas fa-arrow-left"></i>
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
           