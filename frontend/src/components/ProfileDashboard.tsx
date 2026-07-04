import { IconShield } from './ui/Icons';

interface ProfileDashboardProps {
  userProfile: { id: number; name: string; email: string; phone?: string; account_number?: string; account_type?: string; balance?: number; upi_id?: string } | null;
  handleLogout: () => void;
}

export function ProfileDashboard({ userProfile, handleLogout }: ProfileDashboardProps) {
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
              <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.account_number || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Account Type</span>
              <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.account_type || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">Balance</span>
              <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.balance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">upi id</span>
              <span className="text-sm font-mono font-medium text-indigo-300">{userProfile?.upi_id}</span>
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
  );
}
