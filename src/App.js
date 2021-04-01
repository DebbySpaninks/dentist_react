import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./routes/Home";
import Calendar from "./routes/Calendar";
import Day from "./routes/Day";

const App = ({
  appointments,
  handleAddDentist,
  handleAddPatient,
  handleMakeDentistSick,
  handleAddAppointment,
  handleRemoveAppointment,
  handlePatientSick,
  handleMoveAppointment 
}) => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar view</Link>
          </li>
          <li>
            <Link to="/day">Day view</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="/calendar">
            <Calendar
              appointments={appointments}
              handleAddAppointment={handleAddAppointment}
              handleMakeDentistSick={handleMakeDentistSick}
              handlePatientSick={handlePatientSick}
            />
          </Route>
          <Route path="/day">
            <Day appointments={appointments.filter(app => app.day === 1)} 
              handleRemoveAppointment={handleRemoveAppointment}
              handleMoveAppointment={handleMoveAppointment}
            />
          </Route>
          <Route exact path="/">
            <Home />
            <button onClick={() => handleAddDentist()}>Add dentist</button>
            <button onClick={() => handleAddPatient()}>Add Patient</button>
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);
export default App;
