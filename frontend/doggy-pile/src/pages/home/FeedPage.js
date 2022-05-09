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

  // effects
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const data = await DoggyPileAPI.getAllItems('post')
    if (data) {
      setLoading(false)
      setPostDetails(data ? data : [])
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
        <Row className="d-flex justify-content-center feed-cont">
          <Col sm={3}>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-left"/>
          </Col>
          <Col className="d-flex align-items-center justify-content-center" sm={3}>
            <h1 className="sub-header feed"> Welcome, { props.username.username }!</h1>
          </Col>
          <Col sm={3}>
            <img src={require('../../images/footprints.png')} alt="Footprints" className="footprints-right"/>
          </Col>
        </Row>
         
      <Link to={`/post/create-post/`}> <Button className="write-btn mb-5">Write A Post</Button></Link><br/>
    
      { loading ? <Spinner animation="border" variant="secondary" /> : renderPosts() }
    </div>
  )
}

export default FeedPage;