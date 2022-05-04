// After logging in, user is taken to this place to show feed

import { useEffect, useState } from "react";
import DoggyPileAPI from "../../api/DoggyPileAPI";
import PostView from "../../components/posts/viewposts-deleteposts";
import { Link } from "react-router-dom"



function FeedPage(props) {
  // states
  const [postDetails, setPostDetails] = useState([])

  // effects
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    const data = await DoggyPileAPI.getAllItems('post')
    setPostDetails(data ? data : [])
  }

  const removePost = (deletedPostId) => {
    const newposts = postDetails.filter(() => {
      return postDetails.id !== deletedPostId
    })
    setPostDetails(newposts)
    return loadPosts()
  }

  // render
  const renderPosts = () => {
    return postDetails.map((myPost) => {
      console.log(myPost)
      return <PostView key={ myPost.id } myPost={ myPost } removePost={ removePost } />
    })
  }

  return (
    <div>
      <center>
      <h1 id="welcome" ><br/> Welcome <br/></h1> 
      <br/><h1> { props.username.username } </h1>
      <Link to={`/post/create-post/`}> <button className="btn-create">Write A Post</button></Link><br/>

      <h1>Feed</h1>
      
      { renderPosts ()}
    </center>
    </div>
  )
}

export default FeedPage;