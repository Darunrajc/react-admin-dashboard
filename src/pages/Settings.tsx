import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

type SettingsForm = {
  name: string;
  email: string;
  darkMode: boolean;
};

type LocationState = {
  name?: string;
  email?: string;
};

const Settings: React.FC = () => {
  const location = useLocation();
  const { name = '', email = '' } = (location.state || {}) as LocationState;

  const [form, setForm] = useState<SettingsForm>({
    name,
    email,
    darkMode: false,
  });

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setForm((prev) => ({ ...prev, darkMode: true }));
      document.body.classList.add('dark');
    }
  }, []);

  // Apply dark mode styling to body and store in localStorage
  useEffect(() => {
    if (form.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [form.darkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div style={form.darkMode ? styles.containerDark : styles.container}>
      <div style={styles.formWrapper}>
        <h2>Settings</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <label style={styles.label}>
            <input
              type="checkbox"
              name="darkMode"
              checked={form.darkMode}
              onChange={handleChange}
            />
            Enable Dark Mode
          </label>
          <button type="submit" style={styles.button}>Save Settings</button>
          <LogoutButton/>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    color: '#333',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  containerDark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: '#eee',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Settings;
