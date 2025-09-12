// SignUpPage.jsx
import { useState } from "react";
import { Ship } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-300/40 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-ping delay-1000"></div>
      </div>

      {/* Main Wrapper (Center the card vertically & horizontally) */}
      <div className="flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl min-h-[80vh] mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* SIGNUP FORM */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

            <div className="relative z-10">
              {/* LOGO */}
              <div className="mb-8 flex items-center justify-start gap-3">
                <div className="relative">
                 <img src="/Logo.png" alt="Nexora Logo" className="w-8 h-8" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-lg rounded-full"></div>
                </div>
                <span className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 tracking-wider drop-shadow-lg animate-pulse">
                  Nexora
                </span>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <span className="text-red-200">{error.response.data.message}</span>
                </div>
              )}

              <form onSubmit={handleSignup} className="w-full">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Create an Account
                    </h2>
                    <p className="text-gray-300/80 leading-relaxed">
                      Join Nexora and start your language learning adventure!
                    </p>
                  </div>

                  {/* FULL NAME */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Amarjeet Kumar"
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="amar@example.com"
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      required
                    />
                    <p className="text-gray-400 text-xs">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  {/* TERMS */}
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm border-black" required />
                    <span className="text-gray-300 text-sm">
                      I agree to the{" "}
                      <span className="text-cyan-400 hover:underline">terms</span> and{" "}
                      <span className="text-cyan-400 hover:underline">privacy policy</span>
                    </span>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="relative w-full py-4 px-6 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isPending}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-white/20 to-purple-600/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10">
                      {isPending ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </span>
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-gray-300">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 font-semibold transition-all duration-300 hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* IMAGE / ILLUSTRATION */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10 flex items-center justify-center p-12">
              <div className="max-w-md text-center">
                <div className="relative aspect-square max-w-sm mx-auto mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:scale-105 transition-transform duration-500">
                    <img
                      src="/i.png"
                      alt="Language connection illustration"
                      className="w-full h-full object-cover rounded-2xl opacity-90"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white leading-tight">
                  Connect with online partners worldwide
                  <span className="inline-block ml-2 animate-bounce">🌍</span>
                </h2>
                <p className="text-gray-300/90 leading-relaxed text-lg">
                  Practice conversations, make friends, and improve your language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
