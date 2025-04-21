"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import "./App.css"
import MockWindow from "./pages/MockWindow"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Moon, Sun, User, Plus, Home, BarChart, Settings, LogIn } from "lucide-react"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes, set to true

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle("dark-theme")
  }

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.body.classList.add("dark-theme")
    }
  }, [])

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark-theme" : ""}`}>
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
              <>
                <header className="interview-header">
                  <div className="header-content">
                    <div className="logo">
                      <div className="logo-icon">AI</div>
                      <h1>InterviewPro</h1>
                    </div>
                    <p>Advanced AI-powered interview practice platform</p>
                  </div>

                  <div className="header-actions">

                  <button className="action-icon-button" onClick={toggleDarkMode}>
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {isLoggedIn ? (
                      <button className="action-icon-button" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <User size={20} />
                      </button>
                    ) : (
                      <Link to="/login" className="login-button">
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </Link>
                    )}

                    {showProfileMenu && isLoggedIn && (
                      <div className="profile-dropdown">
                        <div className="profile-header">
                          <div className="profile-avatar">JP</div>
                          <div className="profile-info">
                            <h4>John Doe</h4>
                            <p>john.doe@example.com</p>
                          </div>
                        </div>
                        <div className="profile-menu">
                          <Link to="/" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                            <Home size={16} />
                            <span>Home</span>
                          </Link>
                          <Link to="/dashboard" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                            <BarChart size={16} />
                            <span>Dashboard</span>
                          </Link>
                          <Link to="/profile" className="profile-menu-item" onClick={() => setShowProfileMenu(false)}>
                            <Settings size={16} />
                            <span>Edit Profile</span>
                          </Link>
                        </div>
                        <div className="profile-footer">
                          <button
                            className="profile-menu-item text-red"
                            onClick={() => {
                              setIsLoggedIn(false)
                              setShowProfileMenu(false)
                            }}
                          >
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}

                 

                    <NavButton isLoggedIn={isLoggedIn} />
                  </div>
                </header>

                <main className="app-main">
                  <Routes>
                    <Route path="/" element={<MockWindow darkMode={darkMode} />} />
                    <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
                    <Route path="/profile" element={<Profile darkMode={darkMode} />} />
                  </Routes>
                </main>

                <footer className="interview-footer">
                  <p>InterviewPro AI © 2025 | Advanced Interview Simulation Platform</p>
                </footer>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

// Dynamic navigation button based on current route
function NavButton({ isLoggedIn }) {
  const location = useLocation()

  if (!isLoggedIn) {
    return (
      <Link to="/signup" className="add-button">
        <User size={20} />
        <span>Sign Up</span>
      </Link>
    )
  }

  if (location.pathname === "/") {
    return (
      <Link to="/dashboard" className="add-button">
        <BarChart size={20} />
        <span>View Dashboard</span>
      </Link>
    )
  } else if (location.pathname === "/dashboard") {
    return (
      <Link to="/" className="add-button">
        <Plus size={20} />
        <span>New Interview</span>
      </Link>
    )
  } else if (location.pathname === "/profile") {
    return (
      <Link to="/" className="add-button">
        <Home size={20} />
        <span>Back to Home</span>
      </Link>
    )
  }

  return null
}

export default App
