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
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


interface ContentComponentProps {
  contentCode: string;
  switchTab: any;
}

function ContentComponent({contentCode, switchTab}: ContentComponentProps) {
  if (contentCode === "1") {
    return (
      <ListsPage contentCode={contentCode} switchTab={switchTab} />
    )
  } else if (contentCode === "2") {
    return (
      <Allocation />
    )
  } else if (contentCode === "3") {
    return (
      <Viewable />
    )
  }
  return null
}

const AYDemo: FC = (props) => {
  const {children} = props;
  const location = useLocation();
  const [menu, setMenu] = useState(['/']);

  function selectMenu(arg: any) {
    const { keyPath } = arg;
    // setMenu(() => keyPath)

  }
  
  useEffect(function() {
    setMenu([location.pathname])
  }, [location])

  return (
    <Layout className="home_page">
      <Header className="header">
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
      <Footer style={{ textAlign: 'center' }}> ©2020 Created by MG</Footer>
      </Layout>
  )
}

export default AYDemo;