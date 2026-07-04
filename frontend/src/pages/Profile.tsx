import { useAuth } from '../context/AuthContext';
import { ProfileDashboard } from '../components/ProfileDashboard';

export default function Profile() {
  const { userProfile, logout } = useAuth();

  return (
    <ProfileDashboard
      userProfile={userProfile}
      handleLogout={logout}
    />
  );
}
