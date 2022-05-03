import { Link } from "react-router-dom"
import DoggyPileAPI from "../../api/DoggyPileAPI";



function PostView(props) {

  // router params

  // event handlers
  const handleDeletePost = async () => {
    const data = await DoggyPileAPI.deleteItem("post", props.myPost.id) // this is to remove the data from the Django API
    if (data) {
      props.removePost(props.myPost.id) // this is just to remove the data from the parent (nothing to do with the Django API)
    }
  }

return (
  
 
  <section className="day-events new">
    <div className="wrapper">
      <div className="day-card">
        <input type="checkbox" id={ props.myPost.id } className="more" aria-hidden="true"/>
            <div className="content">
                <div className="front">
                    <div className="inner">
                       <Link key={ props.myPost.id } to={ `/post/${ props.myPost.id }` }> <h2 className="story-title">{props.myPost.headline}</h2> </Link>
                            <label htmlFor={ props.myPost.id } className="button" aria-hidden="true">
                               View
                           </label>
                       </div>
                   </div>
                   <div className="back" />
                       <div className="inner">
                           <div className="info">
                               <span>{ props.myPost.headline}</span>
                               <div className="icon">
                                   <i className="fas fa-users"></i>
                                   <span>Title</span>
                               </div>
                           </div>
                           <div className="description">
                               <p>{props.myPost.content}</p>
                                <Link to={`/post/${props?.myPost?.id}/`}> <button className="btn-update">EDIT</button></Link>
                               <button className="btn-delete" onClick={ handleDeletePost }>DELETE</button>
                           </div>
                           <label htmlFor={ props.myPost.id } className="button return" aria-hidden="true">
                               <i className="arrow-left"></i>
                           </label>
                       </div>
                   </div>
               </div>
           </div>
           </section>      
)
}

export default PostView;
           