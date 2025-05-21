import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

type User = {
  name: string;
  email: string;
  company: string;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({ name: '', email: '', company: '' });
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      const formatted = data.map((u: any) => ({
        name: u.name,
        email: u.email,
        company: u.company?.name || ''
      }));
      setUsers(formatted);
    };
    fetchUsers();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;

    const newUser: User = {
      name: form.name,
      email: form.email,
      company: form.company
    };

    setUsers([newUser, ...users]);
    setForm({ name: '', email: '', company: '' });
  };

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2>User Management</h2>
      <LogoutButton/>
      </div>

      {/* Search and Sort Controls */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={() => setSortAsc(!sortAsc)} style={styles.button}>
          Sort {sortAsc ? '↓' : '↑'}
        </button>
      </div>

      {/* User Form */}
      <form onSubmit={handleAddUser} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleFormChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleFormChange}
          style={styles.input}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleFormChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add User</button>
      </form>

      {/* User Table */}
      <div style={styles.grid}>
        {filteredUsers.map((user, idx) => (
          <div key={idx} style={styles.userCard} onClick={() =>
            navigate('/settings', {
              state: { name: user.name, email: user.email },
            })
          }>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    flex: '1 0 200px'
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #ddd'
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #eee'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  userCard: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
};

export default Users;
