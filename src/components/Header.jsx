import React,{useEffect,useState} from 'react'
import { Moon, Sun, User, Plus, Home, BarChart, Settings, LogIn } from "lucide-react"
import MockWindow from "../pages/MockWindow"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import { Link, Route, Routes,useLocation } from 'react-router-dom'


const Header = () => {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [showProfileMenu, setShowProfileMenu] = useState(false)

      const [darkMode, setDarkMode] = useState(false)




      // Check for saved theme preference
      useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
          setDarkMode(true)
          document.body.classList.add("dark-theme")
        }
        if(localStorage.getItem("mock_interview_token")){
           setIsLoggedIn(true);
        }
      }, [])
    
      // Save theme preference when it changes
      useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light")
      }, [darkMode])

      const logOut=()=>{
            localStorage.removeItem("mock_interview_token");
            setIsLoggedIn(false);
            setShowProfileMenu(false);
      }

      const toggleDarkMode = () => {
            setDarkMode(!darkMode)
            document.body.classList.toggle("dark-theme")
          }
    

  return (
    
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
                <img className="profile-avatar" src="https://res.cloudinary.com/dflwei6ak/image/upload/v1739623342/1231474_g0igus.png"/>
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
                  className="add-button"
                  onClick={() => {
                    logOut()
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
          <Route path="/" element={<MockWindow  />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/profile" element={<Profile  />} />
        </Routes>
      </main>

      <footer className="interview-footer">
        <p>InterviewPro AI © 2025 | Advanced Interview Simulation Platform</p>
      </footer>
    </>
  )
}

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

export default Header