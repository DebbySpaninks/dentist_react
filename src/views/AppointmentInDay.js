import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

const AppointmentInDay = ({ 
  time, 
  patient, 
  dentist, 
  assistant, 
  sickDentist,
  handleRemoveAppointment,
  handleMoveAppointment 
}) => (
  <li className="appointment" style={sickDentist ? { backgroundColor: "#FF0000" } : null}>
    <div className="time">{format_time(time)}</div>
    <div className="patient">Patiënt: {patient}
      <button onClick={() => handleRemoveAppointment(patient, time)}>Verwijder afspraak</button>
      <button onClick={() => handleMoveAppointment(patient, time)}>Pas afspraak aan</button>
    </div>
    <div className="dentist">Tandarts: {dentist}</div>
    <div className="assistant">Assistent: {assistant}</div>
  </li>
);

export default AppointmentInDay;