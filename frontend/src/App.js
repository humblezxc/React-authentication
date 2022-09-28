import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route exact path="/" element={<Login />} ></Route>
              <Route path="/dashboard" element={<div><Navbar/><Dashboard/></div>}></Route>
          </Routes>
      </BrowserRouter>
);
}

export default App;
