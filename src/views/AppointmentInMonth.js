import React from "react";

const format_time = time => (time < 10 ? `0${time}:00u` : `${time}:00u`);

const AppointmentInMonth = ({ time, patient, sickDentist }) => (
  <div className="appointment" style={sickDentist ? { backgroundColor: "#FF0000" } : null}>
    <span className="time">{format_time(time)}</span>
    <span className="patient">{patient}</span>
  </div>
);

export default AppointmentInMonth;