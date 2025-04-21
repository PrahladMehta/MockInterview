"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"
import { useNavigate} from "react-router-dom"
import { signUp } from "../api/auth"

const Signup = () => {
  const Navigate=useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "Password strength",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name === "password") {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    let score = 0
    let message = "Weak password"

    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    if (score === 4) message = "Strong password"
    else if (score === 3) message = "Good password"
    else if (score === 2) message = "Fair password"

    setPasswordStrength({ score, message })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    signUp(signupData).then((data)=>{
      // localStorage.setItem("token_mock_interview",data.data.data.token);
      console.log(data);

      if(data.data.success){
          Navigate("/login");
      }
    
    }).catch((error)=>console.log(error));

    // Here you would typically handle user registration
    console.log("Signup attempt with:", signupData)
    // For now, just redirect to home page
    // window.location.href = "/"
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <div className="logo-icon">AI</div>
            <h1>InterviewPro</h1>
          </div>
          <p>Create your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              <span>Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={signupData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
            <div className="password-strength">
              <div className="strength-meter">
                <div
                  className={`strength-fill strength-${passwordStrength.score}`}
                  style={{ width: `${passwordStrength.score * 25}%` }}
                ></div>
              </div>
              <span className="strength-text">{passwordStrength.message}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <CheckCircle size={16} />
              <span>Confirm Password</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={signupData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the{" "}
              <Link to="/terms" className="terms-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="terms-link">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button type="submit" className="auth-button">
            <User size={18} />
            <span>Create Account</span>
          </button>
        </form>

        <div className="auth-divider">
          <span>Or sign up with</span>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            <span>Google</span>
          </button>
          <button className="social-button github">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-benefits">
        <h2>Benefits of joining InterviewPro</h2>
        <ul className="benefits-list">
          <li>
            <div className="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="benefit-text">
              <h4>Unlimited Practice Interviews</h4>
              <p>Practice as many times as you need with different interview types</p>
            </div>
          </li>
          <li>
            <div className="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="benefit-text">
              <h4>Detailed Performance Reports</h4>
              <p>Get insights into your strengths and areas for improvement</p>
            </div>
          </li>
          <li>
            <div className="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="benefit-text">
              <h4>Save Your Progress</h4>
              <p>Track your improvement over time and review past interviews</p>
            </div>
          </li>
          <li>
            <div className="benefit-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="benefit-text">
              <h4>AI-Powered Feedback</h4>
              <p>Receive personalized feedback to improve your interview skills</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Signup
