import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/dashboard.png')",
      }}
    >

      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl text-center">

        <h1 className="text-5xl font-bold mb-4 text-green-700">
          Machine Learning Hub
        </h1>

        <p className="text-lg mb-6 text-center text-gray-700">
          A simple platform for machine learning resources and authentication.
        </p>

        <Link href="/auth">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-300">
            Get Started
          </button>
        </Link>

      </div>
    </div>
  )
}