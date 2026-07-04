import React, { useState } from 'react';
import { Field } from './ui/Field';
import { 
  IconUser, 
  IconPhone, 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconArrow, 
  IconShield 
} from './ui/Icons';

interface AuthFormProps {
  mode: 'login' | 'register' | 'profile';
  switchMode: (m: 'login' | 'register') => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;

  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
}

export function AuthForm({
  mode,
  switchMode,
  handleSubmit,
  isLoading,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword
}: AuthFormProps) {
  const [showPw, setShowPw] = useState(false);

  // Guard against profile mode rendering here
  if (mode === 'profile') return null;

  return (
    <>
      {/* Tabs */}
      <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 gap-1 w-fit mb-6">
        {(['login', 'register'] as const).map(m => (
          <button key={m} id={`tab-${m}`} onClick={() => switchMode(m)}
            className={`px-7 py-2.5 rounded-[9px] text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer border-0 ${
              mode === m
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
                : 'bg-transparent text-white/45 hover:text-white/70'
            }`}>
            {m === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-white tracking-tight mb-2 leading-tight">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-[13.5px] text-white/45">
          {mode === 'login' ? 'Sign in to access your Bank-X dashboard.' : 'Join Bank-X and take control of your finances.'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'register' && (
          <Field id="field-name" label="Full Name" icon={<IconUser />}
            type="text" placeholder="e.g. Your Name"
            value={name} onChange={setName} disabled={isLoading} required />
        )}
        {mode === 'register' && (
          <Field id="field-phone" label="Phone Number" icon={<IconPhone />}
            type="tel" placeholder="+91 98765 43210"
            value={phone} onChange={setPhone} disabled={isLoading} required />
        )}
        <Field id="field-email" label="Email Address" icon={<IconMail />}
          type="email" placeholder="you@example.com"
          value={email} onChange={setEmail} disabled={isLoading} required />
        <Field id="field-password" label="Password" icon={<IconLock />}
          type={showPw ? 'text' : 'password'}
          placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'}
          value={password} onChange={setPassword} disabled={isLoading} required
          suffix={
            <button type="button" id="btn-toggle-password"
              onClick={() => setShowPw(p => !p)}
              className="px-3.5 text-white/30 hover:text-white/60 flex items-center shrink-0 transition-colors border-0 bg-transparent cursor-pointer">
              {showPw ? <IconEyeOff /> : <IconEye />}
            </button>
          } />

        {mode === 'login' && (
          <div className="flex justify-end -mt-1">
            <a href="#" id="link-forgot-password"
              className="text-[12.5px] text-indigo-400 font-semibold hover:text-indigo-300 transition-colors no-underline">
              Forgot password?
            </a>
          </div>
        )}

        <button id={mode === 'login' ? 'btn-login-submit' : 'btn-register-submit'}
          type="submit" disabled={isLoading}
          className="mt-1 py-4 px-6 rounded-[13px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed border-0 cursor-pointer"
          style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}>
          {isLoading
            ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span><IconArrow /></>}
        </button>
      </form>

      {/* Switch */}
      <p className="mt-5 text-[13px] text-white/40 text-center">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button id={mode === 'login' ? 'btn-go-register' : 'btn-go-login'}
          onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
          className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors bg-transparent border-0 cursor-pointer text-[13px] p-0">
          {mode === 'login' ? 'Register here' : 'Log in here'}
        </button>
      </p>

      {/* Security badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-emerald-500/60 font-semibold tracking-wide">
        <IconShield />
        <span>256-bit SSL encrypted &middot; Bank-grade security</span>
      </div>
    </>
  );
}
