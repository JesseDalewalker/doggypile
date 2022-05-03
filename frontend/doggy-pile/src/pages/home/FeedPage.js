// After logging in, user is taken to this place to show feed

import { useEffect, useState } from "react";
import DoggyPileAPI from "../../api/DoggyPileAPI";
import PostView from "../../components/posts/viewposts-deleteposts";



function FeedPage(props) {
  // states
  const [postDetails, setPostDetails] = useState([])

  // effects
  useEffect(() => {
    loadPosts()
  }, [props.username])

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
      <h1 id="welcome" >Welcome, { props.username.username }</h1>
      <h1>My Posts</h1>

      { renderPosts ()}
      <h1>Feed</h1>
    
    </div>
  )
}

export default FeedPage;