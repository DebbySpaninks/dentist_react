import React, { useState, useEffect } from "react";
import App from "./App";
import { names, dentistList, assistantList } from "./utils/names";


const ContainerApp = () => {
  const [dentists, setDentists] = useState(dentistList);
  const [assistants, setAssistants] = useState(assistantList);
  const [patients, setPatients] = useState(names);
  const [appointments, setAppointments] = useState([]);

  // RANDOM FUNCTIES FOR APPOINTMENTS //

  const getRandomTime = () => {
    let hour;
    while (true) {
      hour = Math.floor(Math.random() * 24);
      if (hour > 7 && hour < 19) {
        return hour;
      }
    }
  };

  const getRandomDay = () => Math.floor(Math.random() * 28) + 1;

  const getRandomPatient = () => {
    const person = patients[Math.floor(Math.random() * (names.length - 1))];
    return `${person.name} ${person.surname}`;
  };

  const getRandomDentist = () => {
    const dentist = dentists[Math.floor(Math.random() * (dentistList.length - 1))];
    return `${dentist.name} ${dentist.surname}`;
  };

  const getRandomAssistent = () => {
    const assistant = assistants[Math.floor(Math.random() * assistantList.length)];
    return `${assistant.name} ${assistant.surname}`;
  };

  // MAKE A RANDOM APPOINTMENT //
  const generateRandomAppointment = () => ({
    day: getRandomDay(),
    time: getRandomTime(),
    patient: getRandomPatient(),
    dentist: getRandomDentist(),
    assistant: getRandomAssistent(),
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
    const newId = state.length + 1;
    const newDentist = { id: newId, name, surname, phone, email };

    return [...state, newDentist];
  };

  const addPatient = (state, name, surname, phone, email, birth) => {
    const newId = state.length + 1;
    const newPatient = { id: newId, name, surname, phone, email, birth };
    return [...state, newPatient];
  };

  const dentistSick = (state, dentistId) => {
    // find the dentist
    const findSickDentist = state.filter((dentist) => {
      return dentist.id === dentistId;
    });

    // get the full name
    const sickDentistFullName = `${findSickDentist[0].name} ${findSickDentist[0].surname}`;

    // mark the appointments..
    const markAppointmentsSick = appointments.map((appointment) => {
      if (appointment.dentist === sickDentistFullName) {
        appointment.dentistSick = true;
      }
      return appointment;
    });
    setAppointments(markAppointmentsSick);
  };

  const addAppointment = (state, day, time, patientId, dentistId) => {
    const patient = patients.filter((patient) => {
      return patientId === patient.id;
    });
    const dentist = dentists.filter((dentist) => {
      return dentistId === dentist.id;
    });

    const patientFullName = `${patient[0].name} ${patient[0].surname}`;

    const dentistFullName = `${dentist[0].name} ${dentist[0].surname}`;

    const newAppointments = [
      ...state,
      { day, time, patient: patientFullName, dentist: dentistFullName, dentistSick: false },
    ];

    console.log(newAppointments);
    // setAppointments(newAppointments);
  };

  const removeAppointment = (state, patient, time) => {
    const removedAppointment = state.filter((appointment) => {
      if (appointment.patient === patient && appointment.time === time) {
        return false;
      } else {
        return true;
      }
    });
    setAppointments(removedAppointment);
  };

  const removeAllAppointments = (state, patient) => {
    const removedAppointment = state.filter((appointment) => {
      if (appointment.patient === patient) {
        return false;
      } else {
        return true;
      }
    });
    setAppointments(removedAppointment);
  };

  const changeAppointMent = (state, patient, time, newTime, newDate) => {
    console.log(state, patient, time, newTime, newDate);

    const newAppointments = appointments.map((appointment) => {
      if (appointment.patient === patient && appointment.time === time) {
        appointment.time = newTime;
        appointment.day = newDate;
        console.log(appointment);
      }
      return appointment;
    });

    setAppointments(newAppointments);
  };

  const handleAddDentist = () => {
    const newDentistsState = addDentist(
      dentists,
      "Toos",
      "Trekker",
      "06-12345678",
      "toos@tandartspraktijkbvt.nl"
    );
    setDentists(newDentistsState);
  };

  const handleAddPatient = () => {
    // Add a new patient
    const newPatientsState = addPatient(
      patients,
      "Piet",
      "Auw",
      "06-12345679",
      "piet@wincacademy.nl",
      "1985"
    );
    setPatients(newPatientsState);
  };

  const handleDentistSick = () => {
    //  Make a dentist sick
    dentistSick(dentists, 2);
  };

  const handleAddAppointment = () => {
    addAppointment(appointments, 5, 12, 44, 3);
  };

  const handleRemoveAppointment = (patient, time) => {
    removeAppointment(appointments, patient, time);
  };

  const handlePatientSick = (patientId) => {
    const patient = patients.filter((patient) => {
      return patient.id === patientId;
    });

    const patientFullName = `${patient[0].name} ${patient[0].surname}`;
    removeAllAppointments(appointments, patientFullName);
  };

  const handleMoveAppointment = (patient, time, newTime, newDate) => {
    changeAppointMent(appointments, patient, time, newTime, newDate);
  };

  return (
    <div>
      <App
        appointments={appointments.sort((a, b) => a.time - b.time)}
        dentists={dentists}
        handleAddDentist={handleAddDentist}
        handleAddPatient={handleAddPatient}
        handleAddAppointment={handleAddAppointment}
        handleRemoveAppointment={handleRemoveAppointment}
        handleMoveAppointment={handleMoveAppointment}
        handleDentistSick={handleDentistSick}
        handlePatientSick={handlePatientSick}
      />
    </div>
  );
};

export default ContainerApp;