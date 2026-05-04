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

  // LOADING SCREEN
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

  // DASHBOARD (UNCHANGED UI)
  if (isLoggedIn) {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center p-4 sm:p-8"
      style={{ backgroundImage: "url('/dashboard.png')" }}
    >

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* 🌿 TOP BAR (FIXED LAYOUT) */}
        <div className="flex justify-end pt-2 sm:pt-4">
          <button
            onClick={handleLogout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* HERO HEADER (ADDED SPACE ABOVE) */}
        <div className="text-center mt-10 sm:mt-14 mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-green-200">
            Welcome to ML Hub
          </h1>
          <p className="text-green-100/70 mt-3 text-sm sm:text-base">
            Your AI workspace for building, training, and analyzing machine learning systems
          </p>
        </div>

        {/* 🌿 BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* HERO BENTO CARD */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 p-6 rounded-3xl
            bg-white/10 backdrop-blur-xl border border-green-300/20 shadow-2xl
            hover:scale-[1.02] transition-all duration-300">

            <h2 className="text-green-200 text-2xl font-bold mb-3">
              AI Dashboard Overview
            </h2>

            <p className="text-green-100/70 text-sm leading-relaxed">
              Manage datasets, train models, and monitor AI performance all in one unified workspace.
              Built for speed, clarity, and experimentation in modern machine learning workflows.
            </p>

            <div className="mt-6 h-32 rounded-2xl bg-linear-to-r from-green-700/30 via-emerald-500/20 to-green-900/20"></div>
          </div>

          {/* CARD 1 */}
          <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-green-300/20 shadow-lg hover:scale-[1.03] transition">
            <h3 className="text-green-200 font-semibold">📁 Dataset Manager</h3>
            <p className="text-green-100/60 text-xs mt-1">
              Upload, clean, and organize datasets
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-green-300/20 shadow-lg hover:scale-[1.03] transition">
            <h3 className="text-green-200 font-semibold">🤖 Model Training</h3>
            <p className="text-green-100/60 text-xs mt-1">
              Train and optimize ML models efficiently
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-green-300/20 shadow-lg hover:scale-[1.03] transition">
            <h3 className="text-green-200 font-semibold">📊 Analytics</h3>
            <p className="text-green-100/60 text-xs mt-1">
              View insights and performance metrics
            </p>
          </div>

          {/* CARD 4 */}
          <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-green-300/20 shadow-lg hover:scale-[1.03] transition">
            <h3 className="text-green-200 font-semibold">⚙️ Settings</h3>
            <p className="text-green-100/60 text-xs mt-1">
              Manage account preferences
            </p>
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-10 text-green-100/60 text-xs">
          Built with Next.js • Green AI Bento Dashboard UI • Modern Layout System
        </div>

      </div>
    </div>
  )
}
  // AUTH PAGE (🔥 UPDATED DESIGN)
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/green.png')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* glow behind card */}
      <div className="absolute w-80 h-80 bg-green-600 blur-3xl opacity-20 rounded-full"></div>

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-md">

        {/* glowing border layer */}
        <div className="absolute -inset-1 bg-linear-to-r from-green-700 via-emerald-500 to-green-900 rounded-3xl blur-xl opacity-40"></div>

        {/* glass card */}
        <div className="relative backdrop-blur-2xl bg-white/10 border border-green-300/30 rounded-3xl p-8 sm:p-10 shadow-2xl">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-green-100 text-center mb-2">
            Machine Learning Hub
          </h1>

          <p className="text-center text-green-100/70 text-sm mb-6">
            {isLogin ? 'Login to continue' : 'Create your account'}
          </p>

          {/* USERNAME */}
          {!isLogin && (
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                value={username}
                className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 text-white placeholder-white/60
                focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/30"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-300 text-xs mt-1">Field is required</p>
              )}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 text-white placeholder-white/60
              focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/30"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full p-3 rounded-xl bg-white/10 border border-green-300/20 text-white placeholder-white/60
              focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/30"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          {isLogin ? (
            <button
              onClick={handleLogin}
              className="w-full bg-green-700 hover:bg-green-600 text-white p-3 rounded-xl font-semibold
              shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="w-full bg-green-700 hover:bg-green-600 text-white p-3 rounded-xl font-semibold
              shadow-lg transition-all duration-300 hover:scale-[1.02] flex justify-center items-center"
            >
              {loadingSignup ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign Up'
              )}
            </button>
          )}

          {/* SWITCH */}
          <p className="text-center mt-6 text-sm text-green-100/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
              }}
              className="text-green-300 font-bold ml-2 hover:text-green-200"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}