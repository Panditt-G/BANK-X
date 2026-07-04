import { Outlet } from 'react-router-dom';
import { LeftPanel } from '../components/LeftPanel';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { userProfile } = useAuth();

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

      {/* Main card */}
      <div className="relative z-10 flex w-full max-w-[1000px] h-[min(90vh,680px)] rounded-[28px] overflow-hidden backdrop-blur-3xl"
        style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.05)', background: 'rgba(8,12,22,0.7)' }}>
        
        {/* Left Side Info Panel */}
        <LeftPanel userProfile={userProfile} />

        {/* Right Side Interaction Panel (renders pages dynamically) */}
        <div className="flex-1 flex flex-col px-10 py-8 overflow-y-auto" style={{ background: 'rgba(7,11,19,0.6)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
