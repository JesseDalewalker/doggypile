import '../../pages/extra-pages/Doggy101.scss'


function LocalUserDetails(props) {


  console.log(props.item)
  return (
    <div className='local-user-details-item'>
      <img src={props.item.profile_pic} alt='' style={{width: '100px', height: '100px'}}/>
      <div className='local-user-details-item-info'>
        <p>{props.item.name}</p>
        <p>{props.item.age}</p>
        <p>{props.item.gender}</p>
        <p>{props.item.size}</p>
        <p>{props.item.user_profile.id.first_name}&nbsp;{props.item.user_profile.id.last_name}</p>
        <p>{props.item.user_profile.city}</p>
      </div>
    </div>
  )
}


export default LocalUserDetails;