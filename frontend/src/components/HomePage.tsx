import React from 'react';
import { Layout, Typography } from 'antd';
import TypingPractice from './TypingPractice';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)' }}>
      <Content style={{ padding: '32px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Header/Title Area */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title
              level={1}
              style={{
                background: 'linear-gradient(90deg, #1890ff, #52b4ff)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: 8,
              }}
            >
              HatHat · ئۇيغۇرچە يېزىش مەشىقى
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              维吾尔语打字练习 · ئۇيغۇر تىلى يېزىش ئىقتىدارىنى ئۆستۈرۈڭ
            </Text>
          </div>

          {/* Practice Component */}
          <TypingPractice />
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
