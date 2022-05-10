import DoggyPileAPI from "../../api/DoggyPileAPI";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CommentRender (props) {
  // states
  const [userProfile, setUserProfile] = useState([])

  // use effect
  useEffect(() =>{
    loadUserProfile()
  }, [])

  // handler
  const loadUserProfile = async () => {
    const data = await DoggyPileAPI.getAllItems('user_profile')
    if (data) {
      setUserProfile(data ? data : [])
    }
  }


  const renderComments = () => {
    return props.commentsList.map((comment) => {
      const handleDeleteComment = async () => {
        const data = await DoggyPileAPI.deleteItem("comment", comment.id)
        if (data) {
          props.removeComment(comment.id)
        }
      }
      for (let i=0; i < userProfile.length; i++) {
        for (let k=1; k < userProfile.length; k++) {
          if (userProfile[i].id.id === comment.user.id) {

          return (<div className="comment" key={comment.id}>
            <div className="comment-pic-container">
            <img className="comment-pic" src={userProfile[i] && userProfile[i].profile_pic} alt="" />
            </div>
            <Link target="_blank" key={comment.id} to={`/profile/${comment.user.id}`} className="content-name">{comment && comment.user.username}</Link>
            <p className="comment-content" >{comment && comment.comment}</p>
            <Button className="delete-btn" onClick={ handleDeleteComment } variant="light">Delete Comment</Button>
            </div>)
          } else if (userProfile[k].id.id === comment.user.id) {
            return (<div className="comment" key={comment.id}>
            <div className="comment-pic-container">
            <img className="comment-pic" src={userProfile[k] && userProfile[k].profile_pic} alt="" />
            </div>
            <Link target="_blank" key={comment.id} to={`/profile/${comment.user.id}`} className="author-txt content-name">{comment && comment.user.username}</Link>
            <p className="comment-content" >{comment && comment.comment}</p>
            <Button className="delete-btn" onClick={ handleDeleteComment } variant="light">Delete Comment</Button>
            </div>)
          }
        } console.log("UserProfile[i]:", userProfile[i].id.id, "comment:", comment.user.id)
      } 
    })
  }
 

return (
  <div className="description">
  {renderComments()}
  </div>
)
}

export default CommentRender;