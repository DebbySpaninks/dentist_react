import React from "react";
import App from "./App";
import { names } from "./utils/names.js"
// import { dentistList, assistantList, names } from "./utils";

const ContainerApp = () => {
  return(
    <App names={names}/>
  );
};

export default ContainerApp;