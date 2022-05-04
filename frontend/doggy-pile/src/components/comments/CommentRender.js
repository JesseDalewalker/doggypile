import DoggyPileAPI from "../../api/DoggyPileAPI";
import { Row, Col, Button } from "react-bootstrap";

function CommentRender (props) {
  const renderComments = () => {
    return props.commentsList.map((comment) => {
      const handleDeleteComment = async () => {
        const data = await DoggyPileAPI.deleteItem("comment", comment.id)
        if (data) {
          props.removeComment(comment.id)
        }
      }
      return <div >
        <hr/>
        {comment && comment.comment}<br/>
        -{comment && comment.user.username}<br/>
        <Button className="delete-btn" onClick={ handleDeleteComment } variant="light">Delete Comment</Button>
        <hr/>
      </div>
    })
  }

  return (
    <div className="description">
      {renderComments()}
    </div>
  )
}

export default CommentRender;