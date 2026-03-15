import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import TechSheepLogo from './Logo';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AntHeader
      style={{
        background: '#fff',
        borderBottom: '2px solid #1890ff',
        boxShadow: '0 2px 8px rgba(24, 144, 255, 0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          transition: 'background-color 0.2s',
        }}
        onClick={() => navigate('/')}
      >
        <div
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #1890ff',
            borderRadius: 8,
            background: '#f0f9ff',
          }}
        >
          <TechSheepLogo size={32} style={{ display: 'block' }} />
        </div>
        <Title
          level={4}
          style={{
            margin: 0,
            background: 'linear-gradient(90deg,#1890ff,#52b4ff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 700,
          }}
        >
          HatHat
        </Title>
      </div>

    </AntHeader>
  );
};

export default Header;
