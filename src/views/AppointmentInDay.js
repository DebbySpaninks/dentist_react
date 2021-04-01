import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

const AppointmentInDay = ({
  time,
  patient,
  dentist,
  assistant,
  dentistSick,
  handleRemoveAppointment,
  handleMoveAppointment
}) => (
  <li
    className="appointment"
    style={dentistSick ? { backgroundColor: "red" } : null}>
    <div className="time">{format_time(time)}</div>
    <div className="patient">Patiënt: {patient}
      <button onClick={() => handleRemoveAppointment(patient, time)}>Remove appointment</button>
      <button onClick={() => handleMoveAppointment(patient, time, 16, 1)}>Move appointment</button></div>
    <div className="dentist">Tandarts: {dentist}</div>
    <div className="assistant">Assistent: {assistant}</div>
  </li>
);

export default AppointmentInDay;