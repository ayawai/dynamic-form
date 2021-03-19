import React, {FC, useEffect, useState} from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './index.css';
import '../App.css';
import Viewable from '../Components/Viewable';
import ListsPage from '../Components/ListsPage';
import Allocation from '../Components/Allocation';
import UserFn from '../Components/UserFn';
import { Link, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const AYDemo: FC = (props) => {
  const {children} = props;
  const location = useLocation();
  const [menu, setMenu] = useState(['/']);
  const [collapsed, setCollapsed] = useState(true);

  function selectMenu(arg:any) {
    const { keyPath } = arg;
    // setMenu(() => keyPath)

  }
  
  useEffect(function() {
    setMenu([location.pathname])
  }, [location])

  return (
    <Layout className="home_page">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          { collapsed ? "F" : "冶控填报平台" }
        </div>
        <Menu theme="dark" mode="horizontal" onClick={selectMenu} selectedKeys={menu}>
          <Menu.Item key="/" icon={<VideoCameraOutlined />}>
            <Link to='/'>列表页</Link>
          </Menu.Item>
          <Menu.Item key="/allocation" icon={<UserOutlined />}>
            <Link to='/allocation'>配置页</Link>
          </Menu.Item>
          <Menu.Item key="/view" icon={<UserOutlined />}>
            <Link to='/view'>填报页</Link>
          </Menu.Item>
          <Menu.Item key="/user" icon={<UserOutlined />}>
            <Link to='/user'>用户角色</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <UserFn />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
      
      {/* <Header className="header">
        <Row>
          <Col flex={4} style={{display: "flex"}}>
            <div className="logo">冶控填报平台</div>
            <Menu theme="dark" mode="horizontal" onClick={selectMenu} selectedKeys={menu}>
              <Menu.Item key="/" icon={<VideoCameraOutlined />}>
                <Link to='/'>列表页</Link>
              </Menu.Item>
              <Menu.Item key="/allocation" icon={<UserOutlined />}>
                <Link to='/allocation'>配置页</Link>
              </Menu.Item>
              <Menu.Item key="/view" icon={<UserOutlined />}>
                <Link to='/view'>填报页</Link>
              </Menu.Item>
              <Menu.Item key="/user" icon={<UserOutlined />}>
                <Link to='/user'>用户角色</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col flex={1}>
            <UserFn />
          </Col>
        </Row>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2020 Created by MG</Footer> */}
    </Layout>
  )
}

export default AYDemo;