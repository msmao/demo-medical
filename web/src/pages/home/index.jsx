
import React from 'react';
import { history, Link } from 'umi';
import { Button } from 'antd';

import styles from './index.less';

export default function IndexPage() {

  const authority = JSON.parse(localStorage.getItem('authority') || '{}')

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>

      {authority.auth === 'admin' ? (
        <Button type="primary" onClick={() => { history.push('/admin') }}> View All Patients </Button>
      ) : (
          <Button type="primary" onClick={() => { history.push('/register') }}> Register </Button>
      )}
      
    </div>
  );
}
