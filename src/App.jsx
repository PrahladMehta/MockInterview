import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Header from "./components/Header"

function App() {

  return (
    <Router>
      <div className={`app-container `}>
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup  />} />
          <Route
            path="*"
            element={
               <Header></Header>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
