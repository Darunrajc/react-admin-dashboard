import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const statsData = {
  usersCount: 120,
  activeSessions: 45,
  pendingRequests: 8
};

const registrationsData = [
  { month: "Jan", registrations: 30 },
  { month: "Feb", registrations: 45 },
  { month: "Mar", registrations: 60 },
  { month: "Apr", registrations: 40 },
  { month: "May", registrations: 80 },
  { month: "Jun", registrations: 70 }
];

const rolesData = [
  { role: "Admin", count: 5 },
  { role: "Editor", count: 12 },
  { role: "Viewer", count: 25 }
];

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={styles.heading}>Dashboard</h1>
        <LogoutButton/>
      </div>
      {/* Stats Cards */} 
      <div style={styles.statsRow}>
        <StatCard title="Users" value={statsData.usersCount} onClick={() => navigate('/users')}/>
        <StatCard title="Active Sessions" value={statsData.activeSessions} />
        <StatCard title="Pending Requests" value={statsData.pendingRequests} />
      </div>

      {/* Charts */}
      <div style={styles.chartsRow}>
        <div style={styles.chartBox}>
          <h3>User Registrations Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={registrationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h3>Active Users by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rolesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: number;
  onClick?: () => void;
};

const StatCard: React.FC<StatCardProps> = ({ title, value,onClick }) => (
  <div style={{ ...styles.statCard, cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
    <h4>{title}</h4>
    <p style={styles.statValue}>{value}</p>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '0rem 2rem 0rem 2rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    // marginBottom: '1rem',
  },
  statsRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    flex: 1,
    background: '#f8f9fa',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  chartsRow: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  chartBox: {
    flex: 1,
    minWidth: '350px',
    background: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  }
};

export default Dashboard;
