import { useState } from "react"
import { User, Mail, Briefcase, MapPin, Save, Camera, Trash2 } from "lucide-react"

const Profile = ({ darkMode }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    location: "San Francisco, CA",
    about:
      "Experienced software engineer with a passion for building user-friendly applications. Skilled in React, Node.js, and modern web technologies.",
    experience: "5 years",
    targetRole: "Senior Software Engineer",
    skills: ["React", "JavaScript", "Node.js", "TypeScript", "CSS", "HTML"],
  })

  const [newSkill, setNewSkill] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the profile data to your backend
    alert("Profile updated successfully!")
  }

  return (
    <div className="profile-container">
      <div className="profile-header-section">
        <h2>Edit Profile</h2>
        <p>Update your personal information and preferences</p>
      </div>

      <div className="profile-avatar-section">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <span>JD</span>
          </div>
          <div className="avatar-actions">
            <button className="avatar-button">
              <Camera size={16} />
              <span>Change Photo</span>
            </button>
            <button className="avatar-button secondary">
              <Trash2 size={16} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              <span>Full Name</span>
            </label>
            <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              <span>Email Address</span>
            </label>
            <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="role">
              <Briefcase size={16} />
              <span>Current Role</span>
            </label>
            <input type="text" id="role" name="role" value={profile.role} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={16} />
              <span>Location</span>
            </label>
            <input type="text" id="location" name="location" value={profile.location} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h3>Professional Details</h3>

          <div className="form-group">
            <label htmlFor="about">About Me</label>
            <textarea id="about" name="about" value={profile.about} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <input type="text" id="experience" name="experience" value={profile.experience} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="targetRole">Target Role</label>
            <input type="text" id="targetRole" name="targetRole" value={profile.targetRole} onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <h3>Skills</h3>

          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                <span>{skill}</span>
                <button type="button" onClick={() => removeSkill(skill)} className="skill-remove">
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="skill-input-group">
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <button type="button" onClick={addSkill} className="add-skill-button">
              Add
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
