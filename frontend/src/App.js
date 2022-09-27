import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/register">
              <Register/>
          </Route>
          </Switch>
      </BrowserRouter>
);
}

export default App;
