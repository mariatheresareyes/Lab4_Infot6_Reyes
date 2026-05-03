'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AuthPage() {

  const [isLogin, setIsLogin] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})

  const [loadingLogin, setLoadingLogin] = useState(false)
  const [loadingSignup, setLoadingSignup] = useState(false)

  // SIGN UP
  const handleSignUp = async () => {

    const newErrors = {}

    if (!username) newErrors.username = 'Required'
    if (!email) newErrors.email = 'Required'
    if (!password) newErrors.password = 'Required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoadingSignup(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })

    setLoadingSignup(false)

    if (!error) {
      setIsLogin(true)
      setUsername('')
      setEmail('')
      setPassword('')
    } else {
      setErrors({ email: error.message })
    }
  }

  // LOGIN
  const handleLogin = async () => {

    const newErrors = {}

    if (!email) newErrors.email = 'Required'
    if (!password) newErrors.password = 'Required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoadingLogin(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoadingLogin(false)

    if (!error) {
      setIsLoggedIn(true)
    } else {
      setErrors({ password: 'Invalid email or password' })
    }
  }

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  // LOGIN LOADING SCREEN (FULL SCREEN)
  if (loadingLogin) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-700">Logging in...</p>
        </div>
      </div>
    )
  }

  // DASHBOARD
  if (isLoggedIn) {
    return (
      <div
        className="relative flex items-center justify-center min-h-screen bg-cover bg-center p-4"
        style={{ backgroundImage: "url('/dashboard.png')" }}
      >

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

        <div className="bg-white/90 p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-5xl">

          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 text-center mb-2">
            Welcome to ML Hub
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Your AI workspace for building, training, and analyzing machine learning models.
          </p>

          {/* MODULES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            <div className="bg-green-100 p-4 rounded-xl">
              📊 Projects Dashboard
              <p className="text-sm text-gray-600 mt-1">
                Manage and track ML projects.
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              📁 Dataset Manager
              <p className="text-sm text-gray-600 mt-1">
                Upload and organize datasets.
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              🤖 Model Training Center
              <p className="text-sm text-gray-600 mt-1">
                Train AI models efficiently.
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              📈 Analytics Overview
              <p className="text-sm text-gray-600 mt-1">
                View performance insights.
              </p>
            </div>

          </div>

        </div>
      </div>
    )
  }

  // AUTH PAGE
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/green.png')" }}
    >

      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-96">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-2">
          Machine Learning Hub
        </h1>

        <p className="text-center text-gray-600 mb-6">
          {isLogin ? 'Login to continue' : 'Create your account'}
        </p>

        {/* USERNAME */}
        {!isLogin && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              className={`border w-full p-3 rounded-lg ${errors.username ? 'border-red-500' : ''}`}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">Field is required</p>
            )}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={`border w-full p-3 rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email === 'Required' ? 'Field is required' : errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={`border w-full p-3 rounded-lg ${errors.password ? 'border-red-500' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password === 'Required' ? 'Field is required' : errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}
        {isLogin ? (
          <button
            onClick={handleLogin}
            className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-lg"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleSignUp}
            className="bg-green-600 hover:bg-green-700 text-white w-full p-3 rounded-lg flex items-center justify-center"
          >
            {loadingSignup ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign Up'
            )}
          </button>
        )}

        {/* SWITCH */}
        <p className="text-center mt-5 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setErrors({})
            }}
            className="text-green-700 font-bold ml-2"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  )
}