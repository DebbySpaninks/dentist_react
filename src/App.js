import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./routes/Home";
import Calendar from "./routes/Calendar";
import Day from "./routes/Day";

const App = ({
    appointments,
    handleAddAppointment,
    handleAddDentist,
    handleAddPatient,
    handleSickDentist,
    handleSickPatient,
    handleRemoveAppointment,
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
              handleSickDentist={handleSickDentist}
              handleSickPatient={handleSickPatient}
            />
          </Route>
          <Route path="/day">
            <Day
              appointments={appointments.filter(app => app.day === 1)}
              handleRemoveAppointment={handleRemoveAppointment}
              handleMoveAppointment={handleMoveAppointment}
            />
          </Route>
          <Route path="/">
            <Home />
            <button onClick={() => handleAddDentist()}>Add dentist</button>
            <button onClick={() => handleAddPatient()}>Add patiënt</button>
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);
export default App;