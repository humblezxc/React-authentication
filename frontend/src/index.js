import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";


function App() {
    return (
        <BrowserRouter>
                <Route exact path="/">
                    <Login/>
                </Route>
        </BrowserRouter>
    );
}

export default App;
