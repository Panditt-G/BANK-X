import { useState } from 'react';
import { IconShield } from './ui/Icons';

interface ProfileDashboardProps {
  userProfile: { id: number; name: string; email: string; phone?: string; account_number?: string; account_type?: string; balance?: number; upi_id?: string } | null;
  handleLogout: () => void;
  refreshProfile?: () => Promise<void>;
}

export function ProfileDashboard({ userProfile, handleLogout, refreshProfile }: ProfileDashboardProps) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setMessage({ text: "Please enter a Recipient Account Number or UPI ID.", type: 'error' });
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setMessage({ text: "Please enter a valid amount.", type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount), identifier: recipient.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message || "Deposit successful!", type: 'success' });
        setAmount('');
        setRecipient('');
        if (refreshProfile) {
          await refreshProfile();
        }
        setTimeout(() => {
          setShowDeposit(false);
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ text: data.error || "Deposit failed.", type: 'error' });
      }
    } catch (err) {
      console.error("Deposit API Error:", err);
      setMessage({ text: "Could not connect to backend server.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
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

        {/* Dynamic Display: Profile Details OR Deposit Form */}
        {!showDeposit ? (
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
              <div className="flex items-center gap-4">
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
              <button 
                onClick={() => setShowDeposit(true)}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md shadow-indigo-500/10 border-0 active:scale-95 shrink-0"
              >
                Deposit
              </button>
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
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Account Number</span>
                <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.account_number || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Account Type</span>
                <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.account_type || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Balance</span>
                <span className="text-sm font-mono font-medium text-indigo-300">₹{userProfile?.balance !== undefined ? Number(userProfile.balance).toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">UPI ID</span>
                <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.upi_id || 'N/A'}</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDepositSubmit} className="bg-[#0d1321]/80 border border-white/[0.07] rounded-2xl p-6 mt-6 flex flex-col gap-5">
            <h3 className="text-lg font-bold text-white tracking-tight">Deposit Funds</h3>
            <p className="text-[12.5px] text-white/45 -mt-3">Add money directly to your Bank-X savings account.</p>             {message && (
              <div className={`p-3.5 rounded-xl text-xs font-semibold border ${
                message.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-white/45 uppercase tracking-wider">Recipient (A/C No. or UPI ID)</label>
                {userProfile?.upi_id && (
                  <button
                    type="button"
                    onClick={() => setRecipient(userProfile.upi_id || '')}
                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-0 cursor-pointer p-0"
                  >
                    Use My UPI ID
                  </button>
                )}
              </div>
              <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 focus-within:border-indigo-500 focus-within:bg-white/[0.05] transition-all">
                <input 
                  type="text" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)} 
                  placeholder="e.g. name@bankx or BANKX..." 
                  className="bg-transparent border-none outline-none text-white text-base font-semibold w-full placeholder:text-white/20"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-white/45 uppercase tracking-wider">Amount (₹)</label>
              <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 focus-within:border-indigo-500 focus-within:bg-white/[0.05] transition-all">
                <span className="text-base font-bold text-indigo-400 mr-2">₹</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="0.00" 
                  className="bg-transparent border-none outline-none text-white text-base font-semibold w-full placeholder:text-white/20"
                  min="1"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Quick Amount Suggestion Badges */}
            <div className="flex gap-2 -mt-2">
              {[500, 1000, 5000, 10000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-indigo-500/20 hover:border-indigo-500/30 text-white/60 hover:text-white text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  +₹{val}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-3">
              <button 
                type="button"
                onClick={() => {
                  setShowDeposit(false);
                  setMessage(null);
                  setAmount('');
                  setRecipient('');
                }}
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? 'Processing...' : 'Confirm Deposit'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Action Buttons */}
      {!showDeposit && (
        <div className="mt-8 flex flex-col gap-3">
          <button 
            onClick={handleLogout}
            className="py-4 px-6 rounded-[13px] bg-gradient-to-r from-red-600 to-rose-700 text-white text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-0 cursor-pointer shadow-lg shadow-rose-900/35"
          >
            Sign Out of Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
