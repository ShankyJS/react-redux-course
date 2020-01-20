import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users from "./users/index";
import Tareas from "./Tareas";
import TasksSave from "./Tareas/Save";

import Publications from "./Publications";
const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margin">
      <Route exact path="/" component={Users} />
      <Route exact path="/tasks" component={Tareas} />
      <Route exact path="/publications/:key" component={Publications} />
      <Route exact path="/tasks/save" component={TasksSave} />
      <Route exact path="/tasks/save/:user_id/:task_id" component={TasksSave} />
    </div>
  </BrowserRouter>
);

export default App;
