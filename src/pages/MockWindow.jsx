"use client"

import { useEffect, useState, useRef } from "react"
import "./MockWindow.css"
import { Mic, MicOff, Play, SkipForward, Repeat, Clock, CheckCircle, Briefcase, Code, Users, Volume2, Award, ChevronRight, BarChart, Download, RefreshCw } from 'lucide-react'

const MockInterview = () => {
  const [voices, setVoices] = useState([])
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const recognitionRef = useRef(null)
  const timerRef = useRef(null)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [showTip, setShowTip] = useState(false)

  // Sample interview questions by category
  const interviewQuestions = {
    general: [
      "Tell me about yourself and your background.",
      "What are your greatest strengths and how do they help you succeed?",
      "What do you consider to be your weaknesses and how are you addressing them?",
      "Why are you interested in working for our company specifically?",
      "Where do you see yourself professionally in 5 years?",
    ],
    technical: [
      "Explain the difference between var, let, and const in JavaScript.",
      "What is the virtual DOM in React and why is it important?",
      "Explain the concept of closures in JavaScript with an example.",
      "What is the difference between props and state in React components?",
      "Describe the event loop in JavaScript and how it handles asynchronous operations.",
    ],
    behavioral: [
      "Describe a time when you faced a challenging situation at work and how you resolved it.",
      "Tell me about a time you had to work with a difficult team member and how you handled it.",
      "Give an example of a significant goal you reached and the process you used to achieve it.",
      "Describe a situation where you had to meet a tight deadline and the steps you took.",
      "Tell me about a time you went above and beyond what was required for a project.",
    ],
  }

  const interviewTips = [
    "Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
    "Maintain good eye contact during video interviews.",
    "Research the company before your interview.",
    "Prepare questions to ask the interviewer.",
    "Practice your answers out loud before the interview.",
    "Focus on specific examples rather than general statements.",
    "Be concise and stay on topic with your answers.",
    "Show enthusiasm and positive energy.",
  ]

  // Load available TTS voices
  const loadVoices = () => {
    const synth = window.speechSynthesis
    let voiceList = synth.getVoices()

    if (voiceList.length) {
      setVoices(voiceList)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voiceList = synth.getVoices()
        setVoices(voiceList)
      }
    }
  }

  // Speak given text
  const speakText = (text) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.pitch = 1.0
    utterance.rate = 1
    utterance.volume = 1

    if (voices.length > 0) {
      const englishVoice = voices.find((voice) => voice.lang.includes("en-US"))
      utterance.voice = englishVoice || voices[0]
    }

    synth.cancel()
    synth.speak(utterance)
  }

  // Start/stop speech recognition
  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      clearInterval(timerRef.current)
    } else {
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
      startTimer()
    }
  }

  const startTimer = () => {
    setTimeRemaining(60)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const startInterview = () => {
    setIsLoading(true)
    
    
    // Simulate loading for a smoother transition

      setInterviewStarted(true)
      setCurrentQuestion(0)
      setAnswers([])
      setFeedback("")
      setIsLoading(false)
      
      // Show random tip
      const randomTip = interviewTips[Math.floor(Math.random() * interviewTips.length)]
      setShowTip(randomTip)
      
      // Hide tip after 5 seconds
      setShowAnimation(true)
      setTimeout(() => {
        setShowTip(false)
        setShowAnimation(false)
        // Speak the first question after tip disappears
        speakText(interviewQuestions[selectedCategory][0])
      }, 500)
      
    
  }

  const nextQuestion = () => {
    // Save current answer
    if (transcript.trim()) {
      setAnswers((prev) => [
        ...prev,
        {
          question: interviewQuestions[selectedCategory][currentQuestion],
          answer: transcript,
        },
      ])
    }

    // Animate transition
   
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
      
      // Move to next question
      if (currentQuestion < interviewQuestions[selectedCategory].length - 1) {
        const nextQuestionIndex = currentQuestion + 1
        setCurrentQuestion(nextQuestionIndex)
        setTranscript("")
        speakText(interviewQuestions[selectedCategory][nextQuestionIndex])
      } else {
        // End of interview
        endInterview()
      }
    }, 500)

  }

  const endInterview = () => {
    setInterviewStarted(false)
    setFeedback(
      "Thank you for completing the interview! Here are your responses above. You can review them or start a new interview.",
    )
    speakText("Thank you for completing the interview! You can review your responses or start a new interview.")
  }

  const repeatQuestion = () => {
    speakText(interviewQuestions[selectedCategory][currentQuestion])
  }

  const downloadResponses = () => {
    const content = answers.map((item, index) => 
      `Question ${index + 1}: ${item.question}\n\nYour Answer: ${item.answer}\n\n---\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview-responses.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Init Speech Recognition
  useEffect(() => {
    loadVoices()

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event) => {
      let fullTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        fullTranscript += event.results[i][0].transcript
      }
      setTranscript(fullTranscript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      clearInterval(timerRef.current)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          console.log("Recognition already stopped")
        }
      }
    }
  }, [])

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'general':
        return <Users size={20} />;
      case 'technical':
        return <Code size={20} />;
      case 'behavioral':
        return <Briefcase size={20} />;
      default:
        return <Users size={20} />;
    }
  }

  return (
    <div className="mock-interview-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <header className="interview-header">
        <div className="logo">
          <div className="logo-icon">AI</div>
          <h1>InterviewPro</h1>
        </div>
        <p>Advanced AI-powered interview practice platform</p>
      </header>

      {!interviewStarted ? (
        <div className="setup-section">
          <div className="welcome-message">
            <h2>Welcome to Your Interview Session</h2>
            <p>Practice makes perfect. Choose an interview type below to begin your session.</p>
          </div>
          
          <div className="category-selector">
            <h3>Select Interview Type</h3>
            <div className="category-options">
              <button
                className={selectedCategory === "general" ? "active" : ""}
                onClick={() => setSelectedCategory("general")}
              >
                <Users size={20} />
                <span>General</span>
              </button>
              <button
                className={selectedCategory === "technical" ? "active" : ""}
                onClick={() => setSelectedCategory("technical")}
              >
                <Code size={20} />
                <span>Technical</span>
              </button>
              <button
                className={selectedCategory === "behavioral" ? "active" : ""}
                onClick={() => setSelectedCategory("behavioral")}
              >
                <Briefcase size={20} />
                <span>Behavioral</span>
              </button>
            </div>
            
            <div className="category-description">
              <div className="category-icon">
                {getCategoryIcon(selectedCategory)}
              </div>
              <div className="category-text">
                <h4>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Interview</h4>
                <p>
                  {selectedCategory === "general" && "Standard interview questions to assess your background, goals, and fit for the role."}
                  {selectedCategory === "technical" && "Questions focused on programming concepts, problem-solving, and technical skills."}
                  {selectedCategory === "behavioral" && "Questions about past experiences to evaluate your soft skills and work approach."}
                </p>
              </div>
            </div>
            
            <button 
              className={`start-button ${isLoading ? 'loading' : ''}`} 
              onClick={startInterview}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Preparing Interview...</span>
                </>
              ) : (
                <>
                  <Play size={20} />
                  <span>Start Interview</span>
                </>
              )}
            </button>
          </div>

          {answers.length > 0 && (
            <div className="previous-answers">
              <div className="section-header">
                <h3>Your Previous Responses</h3>
                <button className="icon-button" onClick={downloadResponses}>
                  <Download size={18} />
                  <span>Save</span>
                </button>
              </div>
              
              {answers.map((item, index) => (
                <div key={index} className="answer-item">
                  <div className="question-number">Q{index + 1}</div>
                  <div className="answer-content">
                    <h4>{item.question}</h4>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={`interview-section ${showAnimation ? 'animate-fade' : ''}`}>
          {showTip && (
            <div className="interview-tip">
              <div className="tip-icon">
                <Award size={20} />
              </div>
              <div className="tip-content">
                <h4>Interview Tip</h4>
                <p>{showTip}</p>
              </div>
            </div>
          )}
          
          <div className="question-display">
            <div className="question-header">
              <div className="question-counter">
                <span className="counter-number">{currentQuestion + 1}</span>
                <span className="counter-total">/ {interviewQuestions[selectedCategory].length}</span>
              </div>
              
              <div className="question-category">
                {getCategoryIcon(selectedCategory)}
                <span>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Question</span>
              </div>
            </div>
            
            <div className="current-question">
              <h2>{interviewQuestions[selectedCategory][currentQuestion]}</h2>
              <button className="repeat-button" onClick={repeatQuestion}>
                <Volume2 size={16} />
                <span>Repeat Question</span>
              </button>
            </div>
          </div>

          <div className="answer-section">
            <div className="timer-display">
              <Clock size={16} />
              <span>{timeRemaining} seconds remaining</span>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(timeRemaining / 60) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="transcript-container">
              <div className="transcript-header">
                <h3>Your Answer</h3>
                {isListening && (
                  <div className="listening-indicator">
                    <div className="listening-dot"></div>
                    <div className="listening-dot"></div>
                    <div className="listening-dot"></div>
                  </div>
                )}
              </div>
              
              <div className="transcript-box">
                {transcript || (
                  <span className="placeholder-text">
                    {isListening ? "Listening to your response..." : "Click 'Start Recording' to begin your answer"}
                  </span>
                )}
              </div>
            </div>

            <div className="controls">
              <button 
                className={`record-button ${isListening ? "recording" : ""}`} 
                onClick={toggleListening}
              >
                {isListening ? (
                  <>
                    <MicOff size={18} />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic size={18} />
                    <span>Start Recording</span>
                  </>
                )}
              </button>
              
              <button className="next-button" onClick={nextQuestion}>
                <span>Next Question</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {feedback && (
        <div className="feedback-section">
          <div className="feedback-header">
            <CheckCircle size={24} className="feedback-icon" />
            <h2>Interview Complete!</h2>
          </div>
          
          <p>{feedback}</p>
          
          <div className="feedback-actions">
            <button className="action-button" onClick={() => setInterviewStarted(false)}>
              <RefreshCw size={18} />
              <span>New Interview</span>
            </button>
            
            <button className="action-button" onClick={downloadResponses}>
              <Download size={18} />
              <span>Save Responses</span>
            </button>
            
            <button className="action-button">
              <BarChart size={18} />
              <span>View Analysis</span>
            </button>
          </div>
        </div>
      )}

      <footer className="interview-footer">
        <p>InterviewPro AI © 2024 | Advanced Interview Simulation Platform</p>
      </footer>
    </div>
  )
}

export default MockInterview
