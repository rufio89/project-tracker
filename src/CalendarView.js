// src/components/YearlyCalendar.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './yearly-calendar.css'; // Import custom CSS for additional styling
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);
const eventPropGetter = (event, start, end, isSelected) => {
    const backgroundColor = '#82ab98'; // Your custom green color
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };
  
const YearlyCalendar = ({ projects }) => {
  const events = projects.map((project) => ({
    title: project.title,
    start: new Date(project.startDate),
    end: new Date(project.endDate),
  }));

  // Generate an array of months
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    date.setDate(1);
    return date;
  });

  return (
    <div className="year-calendar">
      {months.map((month, index) => (
        <div key={index} className="month-container">
          <h4>{moment(month).format('MMMM')}</h4>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            views={['month']}
            date={month}
            popup
            tooltipAccessor="desc"
            eventPropGetter={eventPropGetter}
            components={{
                toolbar: CustomToolbar,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default YearlyCalendar;
