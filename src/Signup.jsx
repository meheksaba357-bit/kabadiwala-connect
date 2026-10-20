
import { useState } from 'react'
import './App.css'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = (event) => {
    event.preventDefault()
    alert('Signup page ready! Backend registration is not connected yet.')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-logo">
          ♻️ Kabadiwala Connect
        </a>

        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Join us to make recycling easier.
        </p>

        <form onSubmit={handleSignup}>
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="signup-email">Email Address</label>
          <input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="signup-phone">Phone Number</label>
          <input
            id="signup-phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
            required
          />

          <label htmlFor="signup-password">Password</label>
          <div className="password-field">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              minLength={8}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>

        <a href="/" className="back-home">
          ← Back to Home
        </a>
      </div>
    </div>
  )
}

export default Signup
