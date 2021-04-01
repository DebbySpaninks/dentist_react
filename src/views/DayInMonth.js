import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

const DayInMonth = ({ appointments }) => {
  const appointmentsJSX = appointments.map(({
    time,
    patient,
    dentistSick
  }, index) => (
    <AppointmentInMonth
      time={time}
      patient={patient}
      dentistSick={dentistSick}
      key={index} />
  ));
  return <div className="day">{appointmentsJSX}</div>;
};

export default DayInMonth;