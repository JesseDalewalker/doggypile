// After logging in, user is taken to this place to show feed

import { useEffect, useState } from "react";
import DoggyPileAPI from "../../api/DoggyPileAPI";
import PostView from "../../components/posts/viewposts-deleteposts";
import { Link } from "react-router-dom"
import { Button, Row, Col, Spinner } from "react-bootstrap"
import "./HomeStyles.css"


function FeedPage(props) {
  // states
  const [postDetails, setPostDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [profileDetails, setProfileDetails] = useState(null)

  // effects
  useEffect(() => {
    loadPosts()
    loadProfile()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const data = await DoggyPileAPI.getAllItems('post')
    if (data) {
      setLoading(false)
      setPostDetails(data ? data : [])
    } else {
      setLoading(false)
    }
  }

  const loadProfile = async () => {
    const data = await DoggyPileAPI.getItemById('user_profile', props.username.user_id)
    if (data) {
      setProfileDetails(data ? data : null)
    }
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
      <div className="feed-cont">
        <div className="d-flex justify-content-center overlay"> 
          <Row className="feed-items">
            <Col className="d-flex align-items-center justify-content-center">
              <img src={ profileDetails ? profileDetails.profile_pic : require('../../images/default-avatar.png') } alt="default" className="feed-profile-pic"/>
            </Col>
            <Col sm={7} className="feed-header-txt">
              <h1 align="left" className="feed-welcome">Welcome</h1>
              <div className="user-div">
                <h2 align="left" className="user-header">{ props.username.username }<span style={{color: '#3C3434', fontWeight: '600'}}>!</span></h2>
              </div>
              <Link to={`/post/create-post/`}> <Button className="write-btn">Write A Post</Button></Link><br/>
            </Col>
          </Row>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center feed-bottom-header">
        <h4>View posts by other users</h4>
      </div>
      { loading ? <Spinner animation="border" variant="secondary" /> : renderPosts() }
    </div>
  )
}

export default FeedPage;