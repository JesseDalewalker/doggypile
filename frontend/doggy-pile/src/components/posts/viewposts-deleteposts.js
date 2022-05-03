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
           