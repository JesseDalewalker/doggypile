import '../../pages/extra-pages/Doggy101.scss'
import {Link} from 'react-router-dom'

function LocalUserDetails(props) {


  // console.log(props.item)
  return (
    <div className='local-user-details-item'>
      {/* <Link to={`/profile/${props.item.user_profile.id.id}`}><img src={props.item.profile_pic} alt='' className='dog-image'/></Link> */}
      <img src={props.item.profile_pic} alt='' className='dog-image'/>
      <div className='local-user-details-item-info'>
        <p className='local-user-details-item-info-item'><strong>Name: </strong>{props.item.name}</p>
        <p className='local-user-details-item-info-item'><strong>Age: </strong>{props.item.age}</p>
        <p className='local-user-details-item-info-item'><strong>Gender: </strong>{props.item.gender}</p>
        <p className='local-user-details-item-info-item'><strong>Owner's Name: </strong>{props.item.user_profile.id.first_name}&nbsp;{props.item.user_profile.id.last_name}</p>
        <p className='local-user-details-item-info-item'><strong>Size: </strong>{props.item.size}</p>
        <p className='local-user-details-item-info-item'><strong>City: </strong>{props.item.user_profile.city}</p>
      </div>
    </div>
  )
}


export default LocalUserDetails;