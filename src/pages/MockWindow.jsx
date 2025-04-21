import { useEffect, useState, useRef } from "react"
import { getMockQuestion } from "../api/mock"
import "./MockWindow.css"
import {
  Mic,
  MicOff,
  Play,
  Clock,
  CheckCircle,
  Briefcase,
  Code,
  Users,
  Volume2,
  Award,
  ChevronRight,
  BarChart,
  Download,
  RefreshCw,
  Layers,
  Calendar,
} from "lucide-react"

const MockInterview = ({ darkMode }) => {
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
  const [showRoleExperienceSelection, setShowRoleExperienceSelection] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedInterviewQuestion,setSelectedInterviewQuestion]=useState([]);

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

  // Role-specific questions
  const roleSpecificQuestions = {
    react: [
      "Explain the React component lifecycle methods.",
      "What are hooks in React and how do they work?",
      "How would you optimize performance in a React application?",
      "Explain the concept of context API in React.",
      "What is the difference between controlled and uncontrolled components?",
    ],
    mern: [
      "Explain how you would structure a MERN stack application.",
      "How do you handle authentication in a MERN stack application?",
      "What are the advantages of using MongoDB over a relational database?",
      "Explain how you would implement real-time features in a MERN application.",
      "How do you handle state management across your MERN application?",
    ],
    nodejs: [
      "Explain the event-driven architecture in Node.js.",
      "How does the Node.js module system work?",
      "What are streams in Node.js and how would you use them?",
      "Explain how you would handle errors in a Node.js application.",
      "What are the differences between Node.js and traditional server-side languages?",
    ],
    python: [
      "What are decorators in Python and how would you use them?",
      "Explain the difference between lists and tuples in Python.",
      "How does memory management work in Python?",
      "What are generators in Python and when would you use them?",
      "Explain the concept of duck typing in Python.",
    ],
    java: [
      "Explain the principles of OOP in Java.",
      "What is the difference between an interface and an abstract class?",
      "How does garbage collection work in Java?",
      "Explain the concept of multithreading in Java.",
      "What are the new features introduced in Java 8 and later versions?",
    ],
  }

  const experienceLevels = ["Fresher", "1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"]
  const roles = ["React", "MERN", "Node.js", "Python", "Java"]

  const   interviewTips = [
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
        console.log(voiceList);
        setVoices(voiceList)
      }
    }

  }

  // Speak given text
  const speakText = (text) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-GB"
    utterance.pitch = 1.0
    utterance.rate = 0.9
    utterance.volume = 1

    if (voices.length > 0) {
      const englishVoice = voices.find((voice) => voice.lang.includes("en-GB"))
      utterance.voice = englishVoice || voices[0]
    }

    synth.cancel()
    synth.speak(utterance)
  }

  const getTechMockQuestion=()=>{
    setIsLoading(true);
   getMockQuestion({role:selectedRole,yearsOfExperience:selectedExperience}).then((data)=>{
     console.log(data.data.data);

     setSelectedInterviewQuestion(data.data.data);

     setInterviewStarted(true)
     setCurrentQuestion(0)
     setAnswers([])
     setFeedback("")
     setShowRoleExperienceSelection(false)
      // Show random tip
    const randomTip = interviewTips[Math.floor(Math.random() * interviewTips.length)]
    setShowTip(randomTip)
    // Hide tip after 5 seconds
    setShowAnimation(true)
    setTimeout(() => {
      setShowTip(false)
      setShowAnimation(false)
      speakText(selectedInterviewQuestion[0]);
  
    
    }, 500)
     
     
   }).catch((error)=>{
     console.log(error);
   }).finally(()=>{
    setIsLoading(false);
   })
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
    if (selectedCategory === "technical" && !showRoleExperienceSelection) {
      // Show role and experience selection for technical interviews
      setShowRoleExperienceSelection(true)   
      return
    }
    if(selectedCategory==="technical"){
    
      getTechMockQuestion();
      return;
    }
   
    if(selectedCategory==="general"){
       setSelectedInterviewQuestion(interviewQuestions["general"]);
    }

    if(selectedCategory==="behavioral"){
      setSelectedInterviewQuestion(interviewQuestions["behavioral"]);
    }
    // Simulate loading for a smoother transition
    setInterviewStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setFeedback("")
    setShowRoleExperienceSelection(false)
    setIsLoading(false)

    // Show random tip
    const randomTip = interviewTips[Math.floor(Math.random() * interviewTips.length)]
    setShowTip(randomTip)

    // Hide tip after 5 seconds
    setShowAnimation(true)
    setTimeout(() => {
      setShowTip(false)
      setShowAnimation(false)
      speakText(setSelectedInterviewQuestion[currentQuestion]);    
    }, 500)

  }

  const nextQuestion = () => {
    // Save current answer
    if (transcript.trim()) {
      setAnswers((prev) => [
        ...prev,
        {
          question: getCurrentQuestion(),
          answer: transcript,
        },
      ])
    }

    // Animate transition
    setShowAnimation(true)
    startTimer();
    setTimeout(() => {
      setShowAnimation(false)
      // Get the appropriate question set
      // const questionSet =
      //   selectedCategory === "technical" && selectedRole.toLowerCase() in roleSpecificQuestions
      //     ? roleSpecificQuestions[selectedRole.toLowerCase()]
      //     : interviewQuestions[selectedCategory]

      // Move to next question
      if (currentQuestion < selectedInterviewQuestion.length - 1) {
        const nextQuestionIndex = currentQuestion + 1
        setCurrentQuestion(nextQuestionIndex)
        setTranscript("")
        speakText(selectedInterviewQuestion[nextQuestionIndex]);
      } else {
        // End of interview
        endInterview()
      }
    }, 500)
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

  const getCurrentQuestion = () => {
    return selectedInterviewQuestion[currentQuestion];
  }

  const endInterview = () => {
    setInterviewStarted(false)
    setFeedback(
      "Thank you for completing the interview! Here are your responses above. You can review them or start a new interview.",
    )
    speakText("Thank you for completing the interview! You can review your responses or start a new interview.")
  }

  const repeatQuestion = () => {
    speakText(getCurrentQuestion())
  }

  const downloadResponses = () => {
    const content = answers
      .map((item, index) => `Question ${index + 1}: ${item.question}\n\nYour Answer: ${item.answer}\n\n---\n\n`)
      .join("")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "interview-responses.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
    recognition.lang = "en-GB"
    recognition.interimResults = true
    recognition.continuous = true

    recognition.onresult = (event) => {
      let fullTranscript = ""
      for (let i = 0; i < event.results.length; ++i) {
        fullTranscript += event.results[i][0].transcript
      }
      setTranscript(fullTranscript);
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
    switch (category) {
      case "general":
        return <Users size={20} />
      case "technical":
        return <Code size={20} />
      case "behavioral":
        return <Briefcase size={20} />
      default:
        return <Users size={20} />
    }
  }

  return (
    <div className="mock-interview-container">
      {!interviewStarted ? (
        <div className="setup-section">
          <div className="welcome-message">
            <h2>Welcome to Your Interview Session</h2>
            <p>Practice makes perfect. Choose an interview type below to begin your session.</p>
          </div>

          {!showRoleExperienceSelection ? (
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
                <div className="category-icon">{getCategoryIcon(selectedCategory)}</div>
                <div className="category-text">
                  <h4>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Interview</h4>
                  <p>
                    {selectedCategory === "general" &&
                      "Standard interview questions to assess your background, goals, and fit for the role."}
                    {selectedCategory === "technical" &&
                      "Questions focused on programming concepts, problem-solving, and technical skills."}
                    {selectedCategory === "behavioral" &&
                      "Questions about past experiences to evaluate your soft skills and work approach."}
                  </p>
                </div>
              </div>

              <button
                className={`start-button ${isLoading ? "loading" : ""}`}
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
          ) : (
            <div className="category-selector role-experience-selector">
              <h3>Technical Interview Setup</h3>

              <div className="selection-container">
                <div className="selection-group">
                  <div className="selection-header">
                    <Layers size={20} />
                    <h4>Select Your Role</h4>
                  </div>
                  <div className="selection-options">
                    {roles.map((role) => (
                      <button
                        key={role}
                        className={selectedRole === role ? "active" : ""}
                        onClick={() => setSelectedRole(role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="selection-group">
                  <div className="selection-header">
                    <Calendar size={20} />
                    <h4>Years of Experience</h4>
                  </div>
                  <div className="selection-options">
                    {experienceLevels.map((level) => (
                      <button
                        key={level}
                        className={selectedExperience === level ? "active" : ""}
                        onClick={() => setSelectedExperience(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="selection-summary">
                {selectedRole && selectedExperience && (
                  <div className="summary-content">
                    <p>
                      You've selected a <strong>{selectedRole}</strong> role with <strong>{selectedExperience}</strong>{" "}
                      of experience.
                    </p>
                    <p className="summary-note">Your interview questions will be tailored to this experience level.</p>
                  </div>
                )}
              </div>

              <div className="selection-actions">
                <button className="secondary-button" onClick={() => setShowRoleExperienceSelection(false)}>
                  <ChevronRight className="rotate-180" size={20} />
                  <span>Back</span>
                </button>

                <button
                  className={`start-button ${isLoading ? "loading" : ""}`}
                  onClick={startInterview}
                  disabled={isLoading || !selectedRole || !selectedExperience}
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
            </div>
          )}

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
        <div className={`interview-section ${showAnimation ? "animate-fade" : ""}`}>
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
                <span className="counter-total">
                  /{" "}
                  {selectedInterviewQuestion.length}
                </span>
              </div>

              <div className="question-category">
                {getCategoryIcon(selectedCategory)}
                <span>
                  {selectedCategory === "technical" && selectedRole
                    ? `${selectedRole} (${selectedExperience})`
                    : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}{" "}
                  Question
                </span>
              </div>
            </div>

            <div className="current-question">
              <h2>{getCurrentQuestion()}</h2>
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
                <div className="progress" style={{ width: `${(timeRemaining / 60) * 100}%` }}></div>
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
              <button className={`record-button ${isListening ? "recording" : ""}`} onClick={toggleListening}>
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
    </div>
  )
}

export default MockInterview
