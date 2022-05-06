import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './sass/styles.scss';
import DoggyPileAPI from '../../api/DoggyPileAPI';
import { set } from 'date-fns';


const locales = {
  'en-US': require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function BigCalendar(props) {
  const [userProfile, setUserProfile] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})
  const [allEvents, setAllEvents] = useState()

  console.log()

  const getEvents = async () => {
    console.log('rerender')
    const data = await DoggyPileAPI.getItemById('user_profile', props.username.user_id)
    if (data){
      for (let i = 0; i < data.event.length; i++){
        data.event[i].start = new Date(data.event[i].start)
        data.event[i].end = new Date(data.event[i].end)
      }
      setUserProfile(data)
      setAllEvents(data.event)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  const handleAddEvent = async () => {
    if(newEvent.title == '' || newEvent.start == '' || newEvent.end == '') {
      return (setShowMessage(true))
    }
    console.log("NEW EVENT:", newEvent)
    console.log("USER PROFILE:", userProfile.event)
    userProfile.event.push(newEvent)
    console.log("EDITED: USER PROFILE:", userProfile)
    const update = await DoggyPileAPI.editItems('user_profile', props.username.user_id, userProfile)
    setShowMessage(false)
  }

  return (
    <div className='container-fluid'>
      <br/>
      <div className='row'>
        <div className='col' style={{marginLeft: "250px"}}>
          <div className='calendar-center'>
            <div className='calendar-bg'>
              <h1 className='calendar-font'>Calendar</h1>
              <br/>
              <Calendar localizer={localizer} events={allEvents} startAccessor='start' endAccessor='end' style={{minHeight: '500px', width: '700px'}}/>
            </div>
          </div>
        </div>
        <div className='col' style={{margin: '100px'}}>
          <div className='event-bg'>
            <h3 className='calendar-font'>Add New Event</h3>
            <input type='text' placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
            <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
            <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
            <button onClick={ handleAddEvent }>Add Event</button>
            {showMessage ? <div style={{color: 'red'}}>A field was left blank.</div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCalendar;