import DoggyPileAPI from "../../api/DoggyPileAPI";

function CommentRender (props) {
  const renderComments = () => {
    return props.commentsList.map((comment) => {
      const handleDeleteComment = async () => {
        const data = await DoggyPileAPI.deleteItem("comment", comment.id)
        // if (data) {
        //   props.r
        // }
      }
      return <div>
        {comment && comment.comment}
        {comment && comment.user.username}
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