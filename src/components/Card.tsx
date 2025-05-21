import React from 'react';

interface CardProps {
  title: string;
  value: number | string;
}

const Card: React.FC<CardProps> = ({ title, value }) => (
  <div style={{ padding: '1rem', borderRadius: '8px', background: '#f5f5f5' }}>
    <h4>{title}</h4>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
  </div>
);

export default Card;
