import React, { useState } from 'react';

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

export function Field({ 
  id, 
  label, 
  icon, 
  type, 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  required, 
  suffix 
}: FieldProps) {
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
