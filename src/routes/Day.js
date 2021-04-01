import React from "react";
import "../styles/Day.css";
import AppointmentInDay from "../views/AppointmentInDay";

const Day = ({ appointments, handleRemoveAppointment, handleMoveAppointment }) => {
  const appointmentsJSX = appointments.map(
    ({ time, patient, dentist, assistant, dentistSick }, index) => (
      <AppointmentInDay
        time={time}
        patient={patient}
        dentist={dentist}
        assistant={assistant}
        dentistSick={dentistSick}
        handleRemoveAppointment={handleRemoveAppointment}
        handleMoveAppointment={handleMoveAppointment}
        key={index}
      />
    )
  );
  return <ul className="dayview">{appointmentsJSX}</ul>;
};

export default Day;