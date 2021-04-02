import React from "react";
import "../styles/Calendar.css";
import DayInMonth from "../views/DayInMonth";

const divideByDay = appointments => {
  const appointmentsByDay = {};
  appointments.forEach(appointment => {
    const day = appointment.day;
    if (!appointmentsByDay.hasOwnProperty(day)) {
      appointmentsByDay[day] = [];
    }
    appointmentsByDay[day].push(appointment);
  });
  return appointmentsByDay;
};

const Calendar = ({ 
  appointments,
  handleAddAppointment,
  handleSickDentist,
  handleSickPatient
}) => {
  const appointmentsByDay = divideByDay(appointments);

  const daysInMonthJSX = Object.values(appointmentsByDay)
    .map((appointmentsInDay, index) => (
      <DayInMonth appointments={appointmentsInDay} key={index} />
    ));

  return (
    <div className="calendarview">
      <button onClick={() => handleAddAppointment()}>Add appointment</button>
      <button onClick={() => handleSickDentist()}>Report dentist sick</button>
      <button onClick={() => handleSickPatient(appointments)}>Report patiënt sick</button>
      <div className="header">
        <div>Maandag</div>
        <div>Dinsdag</div>
        <div>Woensdag</div>
        <div>Donderdag</div>
        <div>Vrijdag</div>
      </div>
      <div className="table">{daysInMonthJSX}</div>
    </div>
  );
};

export default Calendar;