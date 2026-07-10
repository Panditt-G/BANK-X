import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { Toast } from '../components/ui/Toast';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Register() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || 'Registration failed', 'error');
        setStatus('error');
        return;
      }

      showToast(data.message || 'Registration successful!', 'success');
      setStatus('success');

      // Redirect to login screen after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error("Register API Error:", error);
      showToast('Cannot connect to backend server.', 'error');
      setStatus('error');
    }
  };

  return (
    <>
      <Toast toast={toast} />
      <AuthForm
        mode="register"
        switchMode={(m) => navigate(m === 'register' ? '/register' : '/login')}
        handleSubmit={handleRegisterSubmit}
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
