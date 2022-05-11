import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './sass/styles.scss';
import DoggyPileAPI from '../../api/DoggyPileAPI';
import moment from 'moment'
import { Button } from 'react-bootstrap';

// const locales = {
//   'en-US': require("date-fns/locale/en-US")
// }

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })
const localizer = momentLocalizer(moment)

function BigCalendar(props) {
  const [userProfile, setUserProfile] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [newEvent, setNewEvent] = useState({id: '', title: '', start: '', end: '', description: ''})
  const [allEvents, setAllEvents] = useState()
  const [displayEditor, setDisplayEditor] = useState(false)
  const [displayEvent, setDisplayEvent] = useState()
  const [startTime, setStartTime] = useState({hours: "", minutes: ""})
  const [endTime, setEndTime] = useState({hours: "", minutes: ""})
  const [falseInvites, setFalseInvites] = useState([])

  const getEvents = async () => {
    console.log('GETTING EVENTS')
    const data = await DoggyPileAPI.getItemById('user_profile', props.username.user_id)
    if (data){
      console.log("DATA:", data)
      if (data.event){
        for (let i = 0; i < data.event.length; i++){
          data.event[i].start = new Date(data.event[i].start)
          data.event[i].end = new Date(data.event[i].end)
        }
      }
      else{
        data.event = []
      }
      setUserProfile(data)
    }
  }

  const deleteEvent = async (bool) => {
    for (let i = 0; i < userProfile.event.length; i++) {
      if (userProfile.event[i].id === displayEvent.id){
        userProfile.event.pop(userProfile.event[i])
        break
      }
    }
    if (bool){
      await DoggyPileAPI.editItems('user_profile', props.username.user_id, userProfile)
      setShowMessage(false)
      window.location.reload(false)
    }
  }

  const setEvents =() => {
    if (userProfile){
      console.log("SETTING EVENTS")
      let inviteList = []
      for (let i = 0; i < userProfile.event.length; i++){
        if (userProfile.event[i].accepted == false){
          inviteList.push(userProfile.event[i])
          userProfile.event.pop(userProfile.event[i])
        }
      }
      setFalseInvites(inviteList)
      setAllEvents(userProfile.event)
    }
  }
  
  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    setEvents()
  }, [userProfile])

  const clickEvent = (event) => {
    setDisplayEvent(event)
    startTime.hours = event.start.getHours()
    startTime.minutes = event.start.getMinutes()
    endTime.hours = event.end.getHours()
    endTime.minutes = event.end.getMinutes()
    setStartTime({...startTime})
    setEndTime({...endTime})
    console.log(event)
    setDisplayEditor(true)
  }

  const handleTime = (bool) => {
    if (startTime.hours == ""){
      startTime.hours = '8'
      setStartTime({...startTime})
    }
    if (endTime.hours == ""){
      endTime.hours = '9'
      setEndTime({...endTime})
    }
    console.log(startTime)
    if (bool){
      newEvent.start.setHours(startTime.hours)
      newEvent.start.setMinutes(startTime.minutes)
      newEvent.end.setHours(endTime.hours)
      newEvent.end.setMinutes(endTime.minutes)
    }
    else {
      displayEvent.start.setHours(startTime.hours)
      displayEvent.start.setMinutes(startTime.minutes)
      displayEvent.end.setHours(endTime.hours)
      displayEvent.end.setMinutes(endTime.minutes)
    }
    console.log("TIME CHANGE:", displayEvent)
  }

  const handleAddEvent = async () => {
    if(newEvent.title == '' || newEvent.start == '' || newEvent.end == '') {
      return (setShowMessage(true))
    }
    handleTime(true)
    let highNum = 0
    for (let i = 0; i < userProfile.event.length; i++){
      if (userProfile.event[i].id > highNum){
        highNum = userProfile.event[i].id
      }
    }
    newEvent.id = highNum + 1
    setNewEvent({...newEvent})
    userProfile.event.push(newEvent)
    const update = await DoggyPileAPI.editItems('user_profile', props.username.user_id, userProfile)
    setShowMessage(false)
  }

  const handleEditEvent = async () => {
    if(displayEvent.title == '' || displayEvent.start == '' || displayEvent.end == '') {
      return (setShowMessage(true))
    }
    handleTime(false)
    deleteEvent(false)
    userProfile.event.push(displayEvent)
    await DoggyPileAPI.editItems('user_profile', props.username.user_id, userProfile)
    setShowMessage(false)
    window.location.reload(false)
  }

  return (
    <div className='container-fluid'>
      <br/>
      <br/>
      <div className='row'>
        <div className='col' style={{marginLeft: "180px"}}>
          <div className='calendar-center'>
            <div className='calendar-bg'>
              <h1 className='calendar-font'>Calendar</h1>
              <br/>
              <Calendar localizer={localizer} onSelectEvent={event => clickEvent(event)} events={allEvents} startAccessor='start' endAccessor='end' style={{minHeight: '500px', width: '700px'}}/>
            </div>
          </div>
        </div>
        <div className='col' style={displayEditor ? {marginLeft: '100px'} : {margin: '100px'}}>
          <div className='event-bg'>
            <h3 className='calendar-font'>Add New Event</h3>
            <input type='text' placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} className="add-new-field"/>
            <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} className="add-new-field"/>
            {newEvent.start ? <div>
              <input id='timeInput' placeholder='Hours' onChange={(e) => setStartTime({...startTime, hours: e.target.value})} />
              <input id='timeInput' placeholder='Mins' onChange={(e) => setStartTime({...startTime, minutes: e.target.value})}/>
            </div> : ""}
            <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} className="add-new-field"/>
            {newEvent.end ? <div>
              <input id='timeInput' placeholder='Hours' onChange={(e) => setEndTime({...endTime, hours: e.target.value})} />
              <input id='timeInput' placeholder='Mins' onChange={(e) => setEndTime({...endTime, minutes: e.target.value})}/>
            </div> : ""}
            <Button className='navbar-item signup-btn mt-3' style={{color:'#F8F2F2' }} onClick={ handleAddEvent }>Add Event</Button>
            {showMessage ? <div style={{color: 'red'}}>A field was left blank.</div> : ""}
          </div>
          {displayEditor ? <div className='row' style={{marginTop: '20px'}}><div className='col' id='editor-bg'><div className='editor-bg'><div className='container-fluid'>
            <h3 className='calendar-font'>Edit Event</h3>
            <div className='row' style={{width: '100%'}}>
              <div className='col-4' style={{textAlign: 'right'}}>
                <h6 className='calendar-font' id='editInput'>Title:</h6>
                <h6 className='calendar-font' id='editInput'>Start Date:</h6> 
                <h6 className='calendar-font' id='editInput'>Start Time:</h6>
                <h6 className='calendar-font' id='editInput'>End Date:</h6>
                <h6 className='calendar-font' id='editInput'>End Time:</h6>
                <h6 className='calendar-font' id='editInput'>Description:</h6>
              </div>
              <div className='col-7' style={{textAlign: 'left'}}>
                <input id='inputbox' type="text" value={displayEvent.title} onChange={(e) => setDisplayEvent({...displayEvent, title: e.target.value})}/>
                <DatePicker id='inputbox' placeholderText='Start Date' selected={displayEvent.start} onChange={(start) => setDisplayEvent({...displayEvent, start})} />
                {displayEvent.start ? <div>
                  <input id='timeInput' style={{width: '75px'}} placeholder='Hours' value={startTime.hours} onChange={(e) => setStartTime({...startTime, hours: e.target.value})} />
                  <input id='timeInput' style={{width: '75px'}} placeholder='Mins' value={startTime.minutes} onChange={(e) => setStartTime({...startTime, minutes: e.target.value})}/>
                </div> : ""}
                <DatePicker id='inputbox' placeholderText='End Date' selected={displayEvent.end} onChange={(end) => setDisplayEvent({...displayEvent, end})} />
                {displayEvent.end ? <div>
                  <input id='timeInput' style={{width: '75px'}} placeholder='Hours' value={endTime.hours} onChange={(e) => setEndTime({...endTime, hours: e.target.value})} />
                  <input id='timeInput' style={{width: '75px'}} placeholder='Mins' value={endTime.minutes} onChange={(e) => setEndTime({...endTime, minutes: e.target.value})}/>
                </div> : ""}
                <textarea id='inputbox' value={displayEvent.description} onChange={(e) => setDisplayEvent({...displayEvent, description: e.target.value})} style={{maxHeight: '200px'}}><input type="text"/></textarea>
                <Button className='navbar-item signup-btn mt-2' style={{color:'#F8F2F2' }} onClick={ handleEditEvent }>Add Changes</Button>
                <Button className='navbar-item signup-btn mt-2' style={{color:'#F8F2F2' }} onClick={ () => deleteEvent(true) }>Delete</Button>
              </div>
          </div>
          </div></div></div></div> : ""}
        </div>
      </div>
    </div>
  );
}

export default BigCalendar;