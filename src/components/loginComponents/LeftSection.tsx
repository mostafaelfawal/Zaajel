import { FaDove } from "react-icons/fa";

export default function LeftSection({isSignup}: {isSignup: boolean}) {
  return (
    <div className="sm:w-2/5 bg-gradient-to-br from-zaajel-primary to-zaajel-secondary p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Decorative Animated Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-12 right-12 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-white/5 rounded-full animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <FaDove className="text-zaajel-primary text-4xl animate-bounce" />
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
          Zaajel
        </h1>

        {/* Tagline */}
        <p className="text-zaajel-text-secondary text-sm mb-8 max-w-xs">
          Connect with your world in a smarter, faster way
        </p>

        {/* Subtitle */}
        <div className="hidden sm:block">
          <h2 className="text-2xl font-semibold text-white mb-3">
            {isSignup ? "Join Our Community" : "Welcome Back"}
          </h2>
          <p className="text-zaajel-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
            {isSignup
              ? "Create your account and start connecting with friends and family instantly."
              : "Log in to continue your conversations and never miss a moment."}
          </p>
        </div>
      </div>
    </div>
  );
}
