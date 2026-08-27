import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await AuthService.login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10 px-4 font-sans">
      {/* Header / Logo */}
      <div className="w-full bg-black py-8 flex justify-center mb-8">
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img src="/logo.png" alt="Melody Logo" className="w-10 h-10 object-contain" />
          <span className="text-white text-2xl font-bold tracking-tighter">Melody</span>
        </Link>
      </div>

      {/* Login Container */}
      <div className="bg-black w-full max-w-[734px] rounded-lg p-0 sm:p-[72px] flex flex-col items-center">
        <h1 className="text-white text-[48px] font-bold tracking-tighter mb-10 text-center">
          Welcome back
        </h1>

        <form onSubmit={handleLogin} className="w-full max-w-[324px] flex flex-col gap-4">
          {error && (
            <div className="bg-[#e22134] text-white text-sm font-medium p-3 rounded-md mb-2 flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"/><path d="M7.25 11.25a.75.75 0 001.5 0v-5a.75.75 0 00-1.5 0v5zM8 4a1 1 0 100 2 1 1 0 000-2z"/></svg>
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-white text-sm font-bold">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#121212] border border-[#878787] hover:border-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white rounded-[4px] p-3 text-white transition-all"
              placeholder=""
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <label className="text-white text-sm font-bold">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#121212] border border-[#878787] hover:border-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white rounded-[4px] p-3 text-white transition-all"
              placeholder=""
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-melody-red text-black font-bold text-base py-3.5 rounded-full hover:scale-105 hover:bg-[#f40612] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? 'Continuing...' : 'Continue'}
          </button>
        </form>

        <div className="flex items-center gap-4 w-full max-w-[324px] my-8">
          <div className="h-[1px] bg-[#292929] flex-1"></div>
          <span className="text-white font-medium text-[15px]">or</span>
          <div className="h-[1px] bg-[#292929] flex-1"></div>
        </div>

        <div className="w-full max-w-[324px] flex flex-col gap-2 mb-8">
          <button className="w-full rounded-full border border-[#878787] py-3 px-8 flex items-center gap-2 text-white font-bold hover:border-white transition-colors relative">
            <img src="https://auth.services.adobe.com/img/google-logo.svg" alt="G" className="w-5 h-5 bg-white rounded-full p-[2px] absolute left-6" />
            <span className="flex-1 text-center">Continue with Google</span>
          </button>
          <button className="w-full rounded-full border border-[#878787] py-3 px-8 flex items-center gap-2 text-white font-bold hover:border-white transition-colors relative">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white absolute left-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span className="flex-1 text-center">Continue with Facebook</span>
          </button>
          <button className="w-full rounded-full border border-[#878787] py-3 px-8 flex items-center gap-2 text-white font-bold hover:border-white transition-colors relative">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white absolute left-6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm2.986 6.814c.32-1.393-.166-2.529-.824-3.321-.737-.872-1.91-1.354-3.08-1.272-1.077.067-2.076.666-2.673 1.547-.643.95-.918 2.22-.686 3.525.753.864 1.942 1.358 3.093 1.258 1.135-.098 2.138-.72 2.723-1.62.29-.446.417-.923.447-1.117zM14.935 18c-1.042-1.428-2.584-1.96-3.83-1.986-1.579-.033-2.937.608-3.955 1.745-.694.776-1.155 1.79-1.248 2.872a9.924 9.924 0 01-3.665-6.848c.003-2.569 1.127-4.887 2.92-6.52.204.428.53.844.972 1.196.488.388 1.128.618 1.77.625 1.004.011 1.905-.44 2.535-1.15.539-.606.846-1.406.84-2.227 0-.083-.005-.164-.015-.245 1.05.748 1.83 1.896 2.146 3.25.105.45.109.924.01 1.385-.143.668-.49 1.28-.962 1.714-.403.37-1.006.663-1.746.732a3.84 3.84 0 01-3.14-.997 4.254 4.254 0 01-1.168-1.89c.896.791 2.238.995 3.396.469 1.487-.677 2.378-2.203 2.502-3.896.619.167 1.222.42 1.795.745 1.05.597 1.902 1.442 2.457 2.474a9.954 9.954 0 01.996 3.42 9.917 9.917 0 01-2.61 7.214c-.035-.303-.133-.585-.294-.827z"/></svg>
            <span className="flex-1 text-center">Continue with Apple</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 text-melody-text items-center mt-6">
          <span className="font-medium text-[15px]">Don't have an account?</span>
          <Link to="/signup" className="text-white hover:text-melody-red hover:underline underline-offset-2 transition-all font-bold">
            Sign up
          </Link>
        </div>
        
        <div className="mt-16 text-center w-full max-w-[734px] pb-8">
          <p className="text-[#878787] text-[11px] font-medium leading-relaxed">
            This site is protected by reCAPTCHA and the Google Privacy<br/>
            Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};
