import React, {FC, useState} from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import './index.css';
import Viewable from '../Components/Viewable';
import ListsPage from '../Components/ListsPage';
import Allocation from '../Components/Allocation';
import UserFn from '../Components/UserFn';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


// interface ContentComponentProps {
//   contentCode: string;
//   switchTab: any
// }

const LoginPage: FC = () => {

  return (
    <div>
      login
    </div>
  )
}

export default LoginPage;