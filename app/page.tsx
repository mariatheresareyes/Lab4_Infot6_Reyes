import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage: "url('/dashboard.png')",
      }}
    >
   
      <div className="absolute inset-0 bg-black/55"></div>

   
      <div className="relative z-10 w-full max-w-4xl text-center">

    
        <div className="relative mx-auto w-full max-w-xl">

  
          <div className="absolute -inset-1 bg-linear-to-r from-green-700 via-emerald-500 to-green-900 rounded-3xl blur-2xl opacity-40"></div>

        
          <div className="relative backdrop-blur-2xl bg-transparent border border-green-400/30 rounded-3xl p-8 sm:p-14 shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:border-green-300/50">

          
            <h1 className="text-3xl sm:text-5xl font-extrabold text-green-200 tracking-tight mb-4">
              Machine Learning Hub
            </h1>

       
            <p className="text-sm sm:text-lg text-green-100/80 leading-relaxed mb-10">
              A modern platform for machine learning exploration, secure authentication,
              and intelligent project development. Build smarter systems with clarity and speed.
            </p>

      
            <Link href="/auth">
              <button className="bg-green-700/90 hover:bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg
                transition-all duration-300 w-full sm:w-auto font-semibold tracking-wide
                hover:shadow-green-500/40 hover:scale-105 border border-green-400/30">
                Get Started
              </button>
            </Link>

          </div>
        </div>

    
        <div className="mt-8 text-white/70 text-xs sm:text-sm px-4">
          <p>
            Built with Next.js • Clean UI • Green-themed minimal design
          </p>
        </div>

      </div>
    </div>
  );
}