import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await AuthService.register(email, password, name);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4 font-sans">
      {/* Header / Logo */}
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img src="/logo.png" alt="Melody Logo" className="w-12 h-12 object-contain" />
          <span className="text-white text-3xl font-bold tracking-tighter">Melody</span>
        </Link>
      </div>

      {/* SignUp Card */}
      <div className="bg-melody-dark w-full max-w-[734px] rounded-lg p-[32px] sm:p-[72px] flex flex-col items-center shadow-xl">
        <h1 className="text-white text-[32px] font-bold tracking-tight mb-10 text-center">
          Sign up to start listening
        </h1>

        <div className="w-full max-w-[324px] flex flex-col gap-2 mb-8">
          <button className="w-full rounded-full border border-[#878787] py-3 px-8 flex items-center justify-center gap-2 text-white font-bold hover:border-white transition-colors">
            <img src="https://auth.services.adobe.com/img/google-logo.svg" alt="G" className="w-5 h-5 bg-white rounded-full p-[2px]" />
            Sign up with Google
          </button>
          <button className="w-full rounded-full border border-[#878787] py-3 px-8 flex items-center justify-center gap-2 text-white font-bold hover:border-white transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Sign up with Facebook
          </button>
        </div>

        <div className="w-full max-w-[734px] flex items-center justify-center mb-8">
          <div className="h-[1px] bg-[#292929] w-full max-w-[324px]"></div>
        </div>

        <form onSubmit={handleSignUp} className="w-full max-w-[324px] flex flex-col gap-4">
          {error && (
            <div className="bg-[#e22134] text-white text-sm font-medium p-3 rounded-md mb-2 flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"/><path d="M7.25 11.25a.75.75 0 001.5 0v-5a.75.75 0 00-1.5 0v5zM8 4a1 1 0 100 2 1 1 0 000-2z"/></svg>
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-bold">What's your email?</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#121212] border border-[#878787] hover:border-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white rounded-[4px] p-3 text-white transition-all"
              placeholder="Enter your email."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-bold">Create a password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#121212] border border-[#878787] hover:border-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white rounded-[4px] p-3 text-white transition-all"
              placeholder="Create a password."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-bold">What should we call you?</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#121212] border border-[#878787] hover:border-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white rounded-[4px] p-3 text-white transition-all"
              placeholder="Enter a profile name."
              required
            />
            <span className="text-sm font-medium text-melody-text mt-1">This appears on your profile.</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-melody-red text-black font-bold text-base py-3.5 mt-6 rounded-full hover:scale-105 hover:bg-[#f40612] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="w-full max-w-[734px] flex items-center justify-center mt-8 mb-6">
          <div className="h-[1px] bg-[#292929] w-full max-w-[324px]"></div>
        </div>

        <div className="flex gap-2 text-melody-text font-medium items-center text-[15px]">
          <span>Have an account?</span>
          <Link to="/login" className="text-white hover:text-melody-red hover:underline underline-offset-2 transition-all">
            Log in.
          </Link>
        </div>
      </div>
    </div>
  );
};
