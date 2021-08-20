import React, { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';

import { history, Link } from 'umi';

import styles from './styles.css';

const {  Content, Sider } = Layout;

export default ({ children }) => {

  const authority = JSON.parse(localStorage.getItem('authority') || '{}')

  return (
    <Layout>
      <Sider
        className={styles.sidebar}
        theme='light'
        width={'20%'}
        breakpoint='xs'
        collapsedWidth={'20%'}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          textAlign: 'right',
          fontWeight: 'bold',
        }}
      >
        <div className={styles.logo}>&nbsp;</div>
        <h2>{authority.username}</h2>
        <ul className={styles.catalog}>
          <li><Link to="/">[ Home ] </Link></li>
          <li>
            <Button type="link" onClick={() => {
              localStorage.removeItem('authority');
              history.push('/');
            }}>
              [ Exit ]
            </Button>
          </li>
        </ul>
      </Sider>
      <Layout style={{ marginLeft: '20%', background: '#fff' }}>
        {/* <Header style={{ padding: 0, background: '#fff' }} /> */}
        <Content style={{ margin: '30px 30px 0', overflow: 'initial', background: '#fff' }}>
          {children}
        </Content>
      </Layout>
      <Sider
        theme='light'
        width={'20%'}
        breakpoint='xs'
        collapsedWidth={'20%'}
      >
      </Sider>
    </Layout>
  );
}
