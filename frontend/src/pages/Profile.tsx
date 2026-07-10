import { useAuth } from '../context/AuthContext';
import { ProfileDashboard } from '../components/ProfileDashboard';

export default function Profile() {
  const { userProfile, logout, refreshProfile } = useAuth();

  return (
    <ProfileDashboard
      userProfile={userProfile}
      handleLogout={logout}
      refreshProfile={refreshProfile}
    />
  );
}
