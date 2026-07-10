import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthForm } from '../components/AuthForm';
import { Toast } from '../components/ui/Toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Unused state placeholders required by AuthForm props
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
 
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || 'Invalid credentials', 'error');
        setStatus('error');
        return;
      }

      showToast(data.message || 'Login successful!', 'success');
      setStatus('success');

      // Call AuthContext login to save token and load profile
      await login(data.token);
      
      // Redirect to profile page
      navigate('/profile');
    } catch (error) {
      console.error("Login API Error:", error);
      showToast('Cannot connect to backend server.', 'error');
      setStatus('error');
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <AuthForm
        mode="login"
        switchMode={(m) => navigate(m === 'register' ? '/register' : '/login')}
        handleSubmit={handleLoginSubmit}
        isLoading={status === 'loading'}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
}
