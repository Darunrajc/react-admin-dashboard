import React from 'react';

export interface UserCardProps {
  name: string;
  email: string;
  company: string;
  onClick?: () => void;
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  minWidth: '250px',
  maxWidth: '300px',
  flex: '1 1 300px',
};

const titleStyle: React.CSSProperties = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  marginBottom: '0.5rem',
};

const UserCard: React.FC<UserCardProps> = ({ name, email, company,onClick }) => (
  <div style={{ 
      ...cardStyle, 
      cursor: onClick ? 'pointer' : 'default' 
    }} onClick={onClick}>
    <div style={titleStyle}>{name}</div>
    <div>{email}</div>
    <div style={{ color: '#555', marginTop: '0.5rem' }}>{company}</div>
  </div>
);

export default UserCard;
