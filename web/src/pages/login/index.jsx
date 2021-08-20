
import React, { useState, useRef, useEffect } from 'react';
import { history } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';

import styles from './styles.less';

export default function Page() {

  const onFinish = (values) => {
    console.log('Success:', values);

    // TODO 发请求获取权限

    const auth = values.username === 'admin' ? 'admin' : 'patient'
    const Authority = { isLogin: true, username: values.username, auth };
    localStorage.setItem('authority', JSON.stringify(Authority));
    history.push('/');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.main}>
      <h1>Login</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password style={{ width: '50%' }} />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  
    </div>
  );
}
