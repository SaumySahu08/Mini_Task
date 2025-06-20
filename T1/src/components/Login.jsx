import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

function Login() {
  const [data, setData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}

    if (!data.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!data.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await login(data)
      localStorage.setItem('token', res.data.refreshToken)
      localStorage.setItem('username', data.username)
      
      navigate('/home')
    } catch (error) {
      console.log('login failed', error)
      setErrors({ form: 'Login failed. Please check credentials.' })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-10 py-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Login</h2>

        {errors.form && (
          <div className="text-red-600 text-sm text-center mb-4">{errors.form}</div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-3">{errors.username}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
          />
          <span
            className="absolute top-2.5 right-3 cursor-pointer text-sm text-blue-600 dark:text-blue-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-2"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
