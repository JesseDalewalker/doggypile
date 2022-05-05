// After logging in, user is taken to this place to show feed

import { useEffect, useState } from "react";
import DoggyPileAPI from "../../api/DoggyPileAPI";
import PostView from "../../components/posts/viewposts-deleteposts";
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import "./HomeStyles.css"


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
      return <PostView key={ myPost.id } myPost={ myPost } removePost={ removePost } username={ props.username } />
    })
  }

  return (
    <div>
      <center>
      <h1><br/> Welcome, { props.username.username }!<br/></h1> 
      <br/>
      <Link to={`/post/create-post/`}> <Button className="write-btn mb-5">Write A Post</Button></Link><br/>
    
      { renderPosts ()}
    </center>
    </div>
  )
}

export default FeedPage;