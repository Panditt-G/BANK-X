import { useState, useEffect } from 'react';

type AuthMode = 'login' | 'register' | 'profile';
type InputStatus = 'idle' | 'loading' | 'success' | 'error';

// ── Icons ──────────────────────────────────────────────────────────────────
const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.67a19.79 19.79 0 01-3.07-8.67A2 2 0 012.88 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ── Field Component ────────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  required?: boolean;
  suffix?: React.ReactNode;
}

function Field({ id, label, icon, type, placeholder, value, onChange, disabled, required, suffix }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold text-white/50 uppercase tracking-widest">
        {label}
      </label>
      <div className={`flex items-center rounded-[13px] border transition-all duration-200 overflow-hidden ${
        focused
          ? 'border-indigo-500/70 shadow-[0_0_0_3px_rgba(99,102,241,0.15)] bg-[#0d1321]'
          : 'border-white/[0.07] bg-[#0d1321]/80'
      }`}>
        <span className="px-3.5 text-white/30 flex items-center shrink-0">{icon}</span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className="flex-1 bg-transparent border-none outline-none text-slate-200 text-sm py-3.5 font-medium placeholder:text-white/20 disabled:opacity-50"
        />
        {suffix}
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<InputStatus>('idle');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<{ id: number; name: string; email: string; phone?: string } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const resetForm = () => {
    setName(''); setPhone(''); setEmail(''); setPassword('');
    setShowPw(false); setStatus('idle');
  };

  const switchMode = (m: AuthMode) => { resetForm(); setMode(m); };

  const fetchProfile = async (authToken: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data.user);
        setMode('profile');
      } else {
        localStorage.removeItem('token');
        setUserProfile(null);
        setMode('login');
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      localStorage.removeItem('token');
      setUserProfile(null);
      setMode('login');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserProfile(null);
    switchMode('login');
    showToast('Logged out successfully!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Decide API endpoint based on current Mode (login/register)
    const endpoint = mode === 'register' ? 'register' : 'login';
    const payload = mode === 'register' 
      ? { name, phone, email, password }
      : { email, password };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error message returned by backend
        showToast(data.error || 'Something went wrong!', 'error');
        setStatus('error');
        return;
      }

      // Success
      showToast(data.message || 'Success!', 'success');
      setStatus('success');

      if (mode === 'register') {
        setTimeout(() => {
          switchMode('login');
        }, 1000);
      } else {
        // Store JWT token for authentication state
        localStorage.setItem('token', data.token);
        await fetchProfile(data.token);
      }
    } catch (error) {
      console.error("API Error:", error);
      showToast('Cannot connect to backend server.', 'error');
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="relative min-h-screen bg-[#060a12] flex items-center justify-center p-4 md:p-6 overflow-hidden">

      {/* Animated blobs */}
      <div className="absolute -top-32 -left-24 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%)', animation: 'blobFloat1 9s ease-in-out infinite' }} />
      <div className="absolute -bottom-36 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(168,85,247,0.18) 0%,transparent 70%)', animation: 'blobFloat2 12s ease-in-out infinite' }} />
      <div className="absolute top-[40%] left-[45%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(236,72,153,0.12) 0%,transparent 70%)', animation: 'blobFloat3 15s ease-in-out infinite' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border backdrop-blur-xl text-[13px] font-semibold shadow-2xl ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400'
            : 'bg-red-950/90 border-red-500/30 text-red-400'
        }`} style={{ animation: 'toastIn 0.3s ease' }}>
          <IconCheck />{toast.msg}
        </div>
      )}

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-[1000px] h-[min(90vh,680px)] rounded-[28px] overflow-hidden backdrop-blur-3xl"
        style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.05)', background: 'rgba(8,12,22,0.7)' }}>

        {/* Left panel */}
        <div className="hidden lg:flex flex-col flex-[0_0_420px] p-[40px_36px] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#1e1060 0%,#3b0f6e 40%,#1a0a40 100%)' }}>
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.25) 0%,transparent 65%)' }} />

          <div className="relative z-10 flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3.5 mb-8">
              <img src="/favicon.png" alt="Bank-X Logo" className="w-14 h-14 object-contain" />
              <div>
                <div className="text-[22px] font-extrabold text-white tracking-tight">Bank-X</div>
                <div className="text-[9px] font-bold text-white/40 tracking-[2.5px] uppercase mt-0.5">Next-Gen Banking</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3.5 flex-1 justify-center">
              {['Zero-fee international transfers','AI-powered spending insights','Real-time fraud protection','Up to 4.5% annual yield'].map((f, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-[8px] bg-indigo-500/20 border border-indigo-500/35 flex items-center justify-center text-indigo-300 shrink-0">
                    <IconCheck />
                  </div>
                  <span className="text-sm text-white/75 font-medium">{f}</span>
                </div>
              ))}
            </div>

            {/* Deco card */}
            <div className="mt-6 rounded-[18px] p-5 border border-white/[0.12]"
              style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold text-white/50 tracking-[1.5px]">BANK-X PLATINUM</span>
                <span className="text-[11px] font-black text-white bg-white/15 px-2 py-1 rounded-md">VISA</span>
              </div>
              <div className="w-8 h-5 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 mb-3.5" />
              <div className="font-mono text-base font-semibold text-white/85 tracking-[3px] mb-3.5">
                {'••••  ••••  ••••  1890'}
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-white/60">
                <span>{userProfile ? userProfile.name.toUpperCase() : 'YOUR NAME'}</span><span>12/31</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col px-10 py-8 overflow-y-auto" style={{ background: 'rgba(7,11,19,0.6)' }}>
          {mode === 'profile' ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Heading */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">
                    Customer Account
                  </span>
                  <h1 className="text-[28px] font-extrabold text-white tracking-tight mt-3 mb-1">
                    Welcome, {userProfile?.name}!
                  </h1>
                  <p className="text-[13px] text-white/45">
                    Your secure Next-Gen Bank-X portal is active.
                  </p>
                </div>

                {/* Profile Details */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                      {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{userProfile?.name}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <IconShield /> Verified Account
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0d1321]/80 border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                      <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Email Address</span>
                      <span className="text-sm font-medium text-white/80">{userProfile?.email}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                      <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Phone Number</span>
                      <span className="text-sm font-medium text-white/80">{userProfile?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Account Number</span>
                      <span className="text-sm font-mono font-medium text-indigo-300">SAVINGS &bull;&bull;&bull;&bull; 1890</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <button 
                  onClick={handleLogout}
                  className="py-4 px-6 rounded-[13px] bg-gradient-to-r from-red-600 to-rose-700 text-white text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-0 cursor-pointer shadow-lg shadow-rose-900/35"
                >
                  Sign Out of Dashboard
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex bg-white/[0.04] border border-white/[0.06] rounded-xl p-1 gap-1 w-fit mb-6">
                {(['login', 'register'] as AuthMode[]).map(m => (
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
          )}
        </div>
      </div>

      <style>{`
        @keyframes blobFloat1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-40px) scale(1.08);}}
        @keyframes blobFloat2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-20px,30px) scale(1.05);}}
        @keyframes blobFloat3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(15px,20px) scale(1.06);}}
        @keyframes toastIn{from{opacity:0;transform:translateY(-16px) scale(0.96);}to{opacity:1;transform:translateY(0) scale(1);}}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0px 1000px #0d1321 inset !important;-webkit-text-fill-color:#e2e8f0 !important;}
      `}</style>
    </div>
  );
}
