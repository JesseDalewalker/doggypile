import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './sass/styles.scss';


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

const events = [
]

function BigCalendar() {
  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''})
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <div className='calendar-center'>
      <h1 className='calendar-font'>Calendar</h1>
      <br></br>
      <Calendar localizer={localizer} events={allEvents} startAccessor='start' endAccessor='end' style={{minHeight: '500px', width: '700px'}}/>
      <h3 className='calendar-font'>Add New Event</h3>
      <div>
        <input type='text' placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
        <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
        <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
        <button onClick={ handleAddEvent }>Add Event</button>
      </div>
    </div>
  );
}

export default BigCalendar;