import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const AuthGate: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) setError(error.message);
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSignUpSuccess(true);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center z-50">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,44,44,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,44,44,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative w-full max-w-[400px] mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[48px] font-black text-[#F4F1EA] leading-none" style={{ fontFamily: "'Six Caps', sans-serif" }}>
            CHRONICLE
          </h1>
          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-[#FF2C2C]/60 mono mt-2">
            City Codex Terminal
          </div>
        </div>

        {/* Auth Card */}
        <div className="border border-white/10 bg-[#121212] p-6">
          {/* Mode toggle */}
          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => { setMode('signin'); setError(''); setSignUpSuccess(false); }}
              className={`flex-1 text-[10px] font-black uppercase tracking-[0.3em] mono py-3 transition-colors ${
                mode === 'signin'
                  ? 'text-[#FF2C2C] border-b border-[#FF2C2C]'
                  : 'text-[#F4F1EA]/30 hover:text-[#F4F1EA]/50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); setSignUpSuccess(false); }}
              className={`flex-1 text-[10px] font-black uppercase tracking-[0.3em] mono py-3 transition-colors ${
                mode === 'signup'
                  ? 'text-[#FF2C2C] border-b border-[#FF2C2C]'
                  : 'text-[#F4F1EA]/30 hover:text-[#F4F1EA]/50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {signUpSuccess ? (
            <div className="text-center py-4">
              <div className="text-[11px] font-bold uppercase text-[#88E788] mono mb-2">
                Account Created
              </div>
              <div className="text-[10px] text-[#F4F1EA]/60 mono">
                Check your email for a confirmation link, then sign in.
              </div>
              <button
                onClick={() => { setMode('signin'); setSignUpSuccess(false); }}
                className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF2C2C] mono hover:text-[#FF2C2C]/70 transition-colors"
              >
                [ Back to Sign In ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 text-[#F4F1EA] text-[12px] mono px-3 py-2.5 focus:border-[#FF2C2C]/50 focus:outline-none transition-colors placeholder:text-[#F4F1EA]/20"
                  placeholder="archivist@chronicle.io"
                />
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#0A0A0A] border border-white/10 text-[#F4F1EA] text-[12px] mono px-3 py-2.5 focus:border-[#FF2C2C]/50 focus:outline-none transition-colors placeholder:text-[#F4F1EA]/20"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-[10px] font-bold text-[#FF2C2C] mono border border-[#FF2C2C]/20 bg-[#FF2C2C]/5 px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-[#FF2C2C]/40 text-[#FF2C2C] text-[10px] font-black uppercase tracking-[0.3em] mono py-3 hover:bg-[#FF2C2C]/10 hover:border-[#FF2C2C]/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting
                  ? 'Processing...'
                  : mode === 'signin'
                    ? '[ Authenticate ]'
                    : '[ Create Account ]'
                }
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <div className="text-[8px] uppercase tracking-[0.4em] text-[#F4F1EA]/20 mono">
            Secure Terminal // v1.0
          </div>
        </div>
      </div>
    </div>
  );
};
