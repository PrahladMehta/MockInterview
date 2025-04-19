import { useState } from "react"
import { BarChart2, Calendar, Award, TrendingUp, Filter, Download } from "lucide-react"

const Dashboard = ({ darkMode }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample interview data
  const interviewData = [
    {
      id: 1,
      date: "2024-04-15",
      category: "technical",
      score: 85,
      duration: "18 min",
      questions: 5,
    },
    {
      id: 2,
      date: "2024-04-10",
      category: "behavioral",
      score: 92,
      duration: "22 min",
      questions: 5,
    },
    {
      id: 3,
      date: "2024-04-05",
      category: "general",
      score: 78,
      duration: "15 min",
      questions: 5,
    },
    {
      id: 4,
      date: "2024-03-28",
      category: "technical",
      score: 80,
      duration: "20 min",
      questions: 5,
    },
    {
      id: 5,
      date: "2024-03-20",
      category: "behavioral",
      score: 88,
      duration: "19 min",
      questions: 5,
    },
  ]

  // Calculate average score
  const averageScore = Math.round(
    interviewData.reduce((sum, interview) => sum + interview.score, 0) / interviewData.length,
  )

  // Get highest score
  const highestScore = Math.max(...interviewData.map((interview) => interview.score))

  // Filter interviews based on selected timeframe and category
  const filteredInterviews = interviewData.filter((interview) => {
    const categoryMatch = selectedCategory === "all" || interview.category === selectedCategory
    return categoryMatch
  })

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Performance Dashboard</h2>
        <p>Track your interview performance and progress over time</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart2 size={24} />
          </div>
          <div className="stat-content">
            <h3>Average Score</h3>
            <div className="stat-value">{averageScore}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>Highest Score</h3>
            <div className="stat-value">{highestScore}%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>Interviews</h3>
            <div className="stat-value">{interviewData.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>Progress</h3>
            <div className="stat-value">+12%</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="filters-section">
          <h3>Interview History</h3>
          <div className="filters">
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="behavioral">Behavioral</option>
                <option value="general">General</option>
              </select>
            </div>

            <button className="icon-button">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="interviews-table">
          <div className="table-header">
            <div className="table-cell">Date</div>
            <div className="table-cell">Category</div>
            <div className="table-cell">Score</div>
            <div className="table-cell">Duration</div>
            <div className="table-cell">Questions</div>
            <div className="table-cell">Actions</div>
          </div>

          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview) => (
              <div key={interview.id} className="table-row">
                <div className="table-cell">{interview.date}</div>
                <div className="table-cell">
                  <span className={`category-badge ${interview.category}`}>
                    {interview.category.charAt(0).toUpperCase() + interview.category.slice(1)}
                  </span>
                </div>
                <div className="table-cell">
                  <div className="score-display">
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{
                          width: `${interview.score}%`,
                          backgroundColor:
                            interview.score >= 90
                              ? "var(--secondary)"
                              : interview.score >= 80
                                ? "var(--primary)"
                                : interview.score >= 70
                                  ? "var(--accent)"
                                  : "#ef4444",
                        }}
                      ></div>
                    </div>
                    <span>{interview.score}%</span>
                  </div>
                </div>
                <div className="table-cell">{interview.duration}</div>
                <div className="table-cell">{interview.questions}</div>
                <div className="table-cell">
                  <button className="view-button">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No interviews found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      <div className="performance-insights">
        <h3>Performance Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Strengths</h4>
            <ul className="insight-list">
              <li>Strong technical knowledge demonstration</li>
              <li>Clear and concise communication</li>
              <li>Excellent problem-solving approach</li>
            </ul>
          </div>
          <div className="insight-card">
            <h4>Areas for Improvement</h4>
            <ul className="insight-list">
              <li>Provide more specific examples in behavioral questions</li>
              <li>Improve response structure with STAR method</li>
              <li>Expand on technical implementation details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
