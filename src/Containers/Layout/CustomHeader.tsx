import React, { useEffect } from 'react';
import {
  Layout,
  Divider,
  Menu,
  Dropdown,
  Button,
  Typography,
  Avatar,
} from 'antd';
import styles from './index.module.scss';
import { logoutUser, removeRole } from '../../utils/sessionStorage';
import { useHistory } from 'react-router-dom';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { getToken, getRole } from '../../utils/sessionStorage';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../Pages/Candidate/actions';
import { IRootState } from '../../reducers';
const { Header } = Layout;
const CustomeHeader = () => {
  let dispatch = useDispatch();
  const {
    notificationsData,
    getCandidateNotificationsSuccess
  } = useSelector((state: IRootState) => state.candidate);
  const history = useHistory();
  const handleLogout = () => {
    logoutUser();
    removeRole();
    history.push('/');
  };
  const token = getToken();
  const role = getRole();
  useEffect(() => {
    dispatch(
      Actions.getNotificationsProgress(),
    );
  }, [])

  const menu = () => (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          Item
        </a>
      </Menu.Item>
    </Menu>
  );

  const notifications = () => (
    <Menu>
      {
        notificationsData && notificationsData.length > 0 ? notificationsData.map((notification: any) => {
          return <Menu.Item key={notification.id}>{notification.message}</Menu.Item>
        }) : <Menu.Item><p>No Notifications</p></Menu.Item>
      }
    </Menu>
  );

  const accountSettingMenu = () => (
    <Menu>
      <Menu.Item>
        <a href="/dashboard/reset-password" rel="noopener noreferrer">
          Settings
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
          <h1 className={styles.logo}>AreWeHiring</h1>

          <ul className={styles.navLink} style={{ width: '50vw' }}>
            <li className={styles.navLinkItems}>
              <Button href="/dashboard" type="link" className={styles.dropDown}>
                Home
              </Button>
            </li>

            {token && role === 'CANDIDATE' && <li className={styles.navLinkItems}>
              <Button
                type="link"
                href="/dashboard/candidate"
                className={styles.dropDown}
              >
                For Candidates
              </Button>
            </li>}
            {token && role === 'EMPLOYER' && <li className={styles.navLinkItems}>
              <Dropdown overlay={menu}>
                <Button
                  type="link"
                  href="/dashboard/employee/post-job"
                  className={styles.dropDown}
                >
                  For Employers
                </Button>
              </Dropdown>
            </li>}
            <li className={styles.navLinkItems}>
              <Dropdown overlay={menu}>
                <Button type="link" className={styles.dropDown}>
                  Blog
                </Button>
              </Dropdown></li>{' '}
            {!token && (
              <li className={styles.navLinkItems}><Button href="/login" type="link" className={styles.dropDown}>
                Login
              </Button></li>
            )}
            {token && (
              <li className={styles.navLinkItems}><Button
                onClick={() => handleLogout()}
                type="link"
                className={styles.dropDown}
              >
                Signout
              </Button></li>
            )}

          </ul>
        </div>
        {token && (
          <div className={`${styles.avatarDiv}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80px' }}>
              <Dropdown overlay={accountSettingMenu}>
                <Avatar
                  className={`ant-dropdown-link`}
                  style={{ backgroundColor: '#1e90ff' }}
                  size={34}
                  icon={<UserOutlined />}
                />
              </Dropdown>

              <Dropdown overlay={notifications} trigger={['click']}>
                <Avatar
                  className={`ant-dropdown-link`}
                  style={{ backgroundColor: '#1e90ff' }}
                  size={34}
                  icon={<BellOutlined />}
                />
              </Dropdown>
            </div>
          </div>

        )}
      </div>
    </Header >
  );
};

export default CustomeHeader;
