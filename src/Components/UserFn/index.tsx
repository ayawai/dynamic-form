import React, {FC, useState, useEffect} from 'react'
import {Dropdown, Menu, Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import styles from './index.module.css'
import proxyRequest from '../../utils/request';
import { baseUrl } from '../../utils/baseServer';

const UserFn: FC = () => {

  const [user, setUser] = useState({name: ""})

  const handleMenuClick = () => {

  }

  useEffect(() => {
    proxyRequest.get(baseUrl + `/user`, {id: 1}).then(function(res: any) {
      if (res) {
        setUser(res.data)
      }
    });
  }, []);

  const ToggleMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.header_right}>
      <Dropdown overlay={ToggleMenu} className={styles.user_dropdown} placement="bottomCenter">
        <div>
          <Avatar icon={<UserOutlined />} />
          <span className={styles.username}>{user.name}</span>
        </div>
      </Dropdown>
    </div>
  )
}

export default UserFn;