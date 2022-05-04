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
      return <div>
        {comment && comment.comment}
        {comment && comment.user.username}
        <Button className="delete-btn" onClick={ handleDeleteComment } variant="light">Delete Comment</Button>
      </div>
    })
  }

  return (
    <div>
      {renderComments()}
    </div>
  )
}

export default CommentRender;