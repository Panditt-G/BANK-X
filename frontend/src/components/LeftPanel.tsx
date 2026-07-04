import { IconCheck } from './ui/Icons';

interface LeftPanelProps {
  userProfile: { name: string } | null;
}

export function LeftPanel({ userProfile }: LeftPanelProps) {
  return (
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
          {['Zero-fee international transfers', 'AI-powered spending insights', 'Real-time fraud protection', 'Up to 4.5% annual yield'].map((f, i) => (
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
            <span>{userProfile ? userProfile.name.toUpperCase() : 'YOUR NAME'}</span>
            <span>12/31</span>
          </div>
        </div>
      </div>
    </div>
  );
}
