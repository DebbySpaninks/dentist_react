import React, { useState, useEffect } from "react";
import App from "./App";

import { arrayOfEmployees, arrayOfPatients } from "./utils/utils";

const Container = () => {
  const [employees, setEmployees] = useState(arrayOfEmployees);
  const [patients, setPatients] = useState(arrayOfPatients);
  const [appointments, setAppointments] = useState([]);

  const getRandomTime = () => {
    let hour;
    while (true) {
      hour = Math.floor(Math.random() * 24);
      if (hour > 7 && hour < 19) {
        return hour;
      };
    };
  };

  const getRandomDay = () => Math.floor(Math.random() * 28) + 1;

  const getRandomPatient = () => {
    const person = patients[Math.floor(Math.random() * 230)];
    return `${person.name} ${person.surname}`;
  };

  const getRandomEmployee = () => {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    return `${employee.name} ${employee.surname}`;
  };

  const generateRandomAppointment = () => ({
    day: getRandomDay(),
    time: getRandomTime(),
    patient: getRandomPatient(),
    dentist: getRandomEmployee(),
    assistant: getRandomEmployee(),
    dentistSick: false,
  });

  const generateRandomAppointments = (num) =>
    Array(num)
      .fill(0)
      .map((_) => generateRandomAppointment());

  const randomAppointments = generateRandomAppointments(150);

  useEffect(() => {
    setAppointments(randomAppointments);
  }, []);

  const addDentist = (state, name, surname, phone, email) => {
    const newId = state[0].id + 1;
    const newDentist = { id: newId, name, surname, phone, email };

    return [...state, newDentist];
  };

  const addPatient = (state, name, surname, phone, email, birthday) => {
    const newId = state[0].id + 1;
    const newPatient = { id: newId, name, surname, phone, email, birthday };
    return [...state, newPatient];
  };

  const addSickDentist = (state, dentistId) => {
    const findSickDentist = state.filter((dentist) => dentist.id === dentistId);

    const sickDentistFullName = `${findSickDentist[0].name} ${findSickDentist[0].surname}`;

    const markAppointmentsSick = appointments.map((appointment) => {
      if (appointment.dentist === sickDentistFullName) {
        appointment.dentistSick = true;
      }
      return appointment;
    });
    setAppointments(markAppointmentsSick);
  };

  const addAppointment = (state, day, time, patientId, dentistId) => {
    const patient = patients.filter((patient) => patientId === patient.id);
    const dentist = employees.filter((dentist) => dentistId === dentist.id);

    const patientFullName = `${patient[0].name} ${patient[0].surname}`;
    const dentistFullName = `${dentist[0].name} ${dentist[0].surname}`;

    const newAppointments = [...state,
    { day, time, patient: patientFullName, dentist: dentistFullName, dentistSick: false }];

    return setAppointments(newAppointments);
  };

  const removeAppointment = (state, patient, time) => {
    const removedAppointment = state.filter((appointment) => {
      return appointment.patient === patient && appointment.time === time ? false : true;
    });
    return setAppointments(removedAppointment);
  };

  const removeAllAppointments = (appointments, patients) => {
    const removedAppointment = appointments.filter((appointment) => {
      return appointment.patient === `${patients[0].name} ${patients[0].surname}` ? false : true;
    });
    return setAppointments(removedAppointment);
  };

  const changeAppointment = (patient, time) => {
    const newAppointment = appointments.map((appointment) => {
      if (appointment.patient === patient && appointment.time === time) {
        appointment.time = getRandomTime();
        appointment.day = getRandomDay();
      };
      return appointment;
    });
    setAppointments(newAppointment);
  };

  const handleAddDentist = () => {
    const newDentistsState = addDentist(
      employees,
      "Toos",
      "Trekker",
      "06-12345678",
      "toos@tandartspraktijkbvt.nl"
    );
    setEmployees(newDentistsState);
    console.log(newDentistsState);
  };

  const handleAddPatient = () => {
    const newPatientsState = addPatient(
      patients,
      "Piet",
      "Auw",
      "06-12345679",
      "piet@wincacademy.nl",
      "1985"
    );
    setPatients(newPatientsState);
    console.log(newPatientsState);
  };

  const handleSickDentist = () => addSickDentist(employees, employees[0].id);

  const handleAddAppointment = () => addAppointment(appointments, getRandomDay(), getRandomTime(), patients[0].id, employees[0].id);

  const handleRemoveAppointment = (patient, time) => {
    removeAppointment(appointments, patient, time);
  };

  const handlePatientSick = ((appointments) => removeAllAppointments(appointments, patients));

  const handleMoveAppointment = (patient, time) => {
    changeAppointment(patient, time);
  };

  return (
    <>
      <App
        appointments={appointments.sort((a, b) => a.time - b.time)}
        dentists={employees}
        handleAddAppointment={handleAddAppointment}
        handleAddDentist={handleAddDentist}
        handleAddPatient={handleAddPatient}
        handleSickDentist={handleSickDentist}
        handlePatientSick={handlePatientSick}
        handleRemoveAppointment={handleRemoveAppointment}
        handleMoveAppointment={handleMoveAppointment}
      />
    </>
  );
};

export default Container;