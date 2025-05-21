import React from 'react';

interface GraphCardProps {
  title: string;
  children: React.ReactNode;
}

const GraphCard: React.FC<GraphCardProps> = ({ title, children }) => (
  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default GraphCard;
