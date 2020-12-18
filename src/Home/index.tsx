import React, {FC, useState} from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './index.css';
import Viewable from '../Components/Viewable';
import ListsPage from '../Components/ListsPage';
import Editable from '../Components/Editable';
import UserFn from '../Components/UserFn';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


interface ContentComponentProps {
  contentCode: string;
}

function ContentComponent({contentCode}: ContentComponentProps) {
  if (contentCode === "1") {
    return (
      <Editable />
    )
  } else if (contentCode === "2") {
    return (
      <ListsPage />
    )
  } else if (contentCode === "3") {
    return (
      <Viewable />
    )
  }
  return null
}

const AYDemo: FC = () => {
  const [menu, setMenu] = useState(['1']);

  function selectMenu(arg: any) {
    const { keyPath } = arg;
    setMenu(() => keyPath)
  }

  return (
    <Layout className="home_page">
      <Header className="header">
        <Row>
          <Col flex={4} style={{display: "flex"}}>
            <div className="logo">冶控填报平台</div>
            <Menu theme="dark" mode="horizontal" onClick={selectMenu} selectedKeys={menu} defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<VideoCameraOutlined />}>
                配置页
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                列表页
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                填报页
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
        <ContentComponent contentCode={menu[0]} />
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2020 Created by MG</Footer>
        {/* <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={selectMenu} selectedKeys={menu} defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              配置页
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              显示页
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <ContentComponent contentCode={menu[0]} />
          </Content>
        </Layout> */}
      </Layout>
  )
}

export default AYDemo;