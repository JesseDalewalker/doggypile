import '../../pages/extra-pages/Doggy101.scss'
import {Link} from 'react-router-dom'
import { Carousel, Row, Col, Button } from 'react-bootstrap';
// SVG import
import maleSign from "../../images/male-sign.svg"
import femaleSign from "../../images/female-sign.svg"

function LocalUserDetails(props) {

  const renderGenderSigns = () => {
    if (props.item && props.item.gender === 'Male') {
      return <img alt="Gender sign" src={maleSign} className="gender"/>
    } 
    else if (props.item && props.item.gender === 'Female') {
      return <img alt="Gender sign" src={femaleSign} className="gender"/>
    }
  }

  // console.log(props.item)
  return (
    <>
      <div className="local-carousel-bg">
        <h4>{props.item.name} {renderGenderSigns()}</h4>
        <img src={props.item.profile_pic} alt='' className="dog-image" /></div>
        <Carousel.Caption className="dog-items-cont">
          <Row className="dog-items">
            <Col sm={3} className='dog-details'>
              <h5>Owner</h5>
              <h5>Age</h5>
              <h5>Size</h5>
              <h5>City</h5>
            </Col>
            <Col sm={8} className='dog-details values'>
              <p>{props.item.user_profile.id.first_name}&nbsp;{props.item.user_profile.id.last_name}</p>
              <p>{props.item.age}</p>
              <p>{props.item.size}</p>
              <p>{props.item.user_profile.city}</p>
            </Col>
          </Row>
          <Row>
            <Link to={`/profile/${props.item.user_profile.id.id}`}><Button className='edit-btn local'>Go to Profile</Button></Link>
          </Row>
        </Carousel.Caption>
    </>
  )
}


export default LocalUserDetails;