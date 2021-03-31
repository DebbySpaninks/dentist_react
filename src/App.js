import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./routes/Home";
import Calendar from "./routes/Calendar";
import Day from "./routes/Day";

import generateRandomAppointments from "./utils/utils";

const appointments = generateRandomAppointments(70);

const App = ({  handleAddAppointment }) => (
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
            />
          </Route>
          <Route path="/day">
            <Day appointments={appointments.filter(app => app.day === 1)} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  </Router>
);
export default App;
