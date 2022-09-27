import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Login />} ></Route>
              <Route path="/dashboard" element={<Navbar> <Dashboard/></Navbar>}></Route>
              <Route path="/register" element={<Register />}></Route>

          </Routes>
      </BrowserRouter>
);
}

export default App;
