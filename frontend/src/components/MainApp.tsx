import React, { useState } from 'react';
import { Layout, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import TypingPractice from './TypingPractice';
import HomePage from './HomePage';

const { Header, Content } = Layout;
const { Title } = Typography;

type AppState = 'home' | 'typing';

interface TestConfigData {
  testType: 'uyghur' | 'pinyin' | 'english';
  articleType: 'random' | 'select';
  testTime: number;
  showKeyboard: boolean;
  nightMode: boolean;
  showTrajectory: boolean;
}

const MainApp: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('home');
  const [testConfig, setTestConfig] = useState<TestConfigData | null>(null);



  const handleBackToHome = () => {
    setAppState('home');
    setTestConfig(null);
  };

  return (
    <div className="main-app">
      {appState === 'home' && (
        <HomePage />
      )}
      
      {appState === 'typing' && testConfig && (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)' }}>
          {/* 顶部导航栏 */}
          <Header style={{ 
            background: '#fff', 
            borderBottom: '2px solid #1890ff',
            boxShadow: '0 2px 8px rgba(24, 144, 255, 0.1)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#1890ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}>
                &lt;code&gt;
              </div>
              <Title level={3} style={{ margin: '0 0 0 12px', color: '#1890ff' }}>
                HatHat
              </Title>
            </div>
            
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              {testConfig?.testType === 'uyghur' && '维吾尔语打字'}
              {testConfig?.testType === 'pinyin' && '汉语拼音打字'}
              {testConfig?.testType === 'english' && '英文打字'}
            </Title>
            
            <Button 
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToHome}
              style={{ background: '#f0f9ff', borderColor: '#1890ff', color: '#1890ff' }}
            >
              返回首页
            </Button>
          </Header>

          {/* 练习内容区域 */}
          <Content style={{ padding: 0 }}>
            <TypingPractice 
              testType={testConfig?.testType || 'uyghur'}
            />
          </Content>
        </Layout>
      )}
    </div>
  );
};

export default MainApp;
