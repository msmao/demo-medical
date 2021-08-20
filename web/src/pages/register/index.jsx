import React, { useState } from 'react';
import { Form, Input, Upload, DatePicker, Button, message } from 'antd';
import { history, Link } from 'umi';

import { UploadOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import moment from 'moment';
import { uploadFile, createPatient } from '@/services/patient';

import styles from './styles.less';


const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegisterPage() {

  const [form] = Form.useForm();
  const [imageUrl] = useState(null);
  const [loading] = useState(false);

  const onFinish = async (value) => {
    console.log('Received values of form: ', value);
    const { name, birthday, email, phone, address, photo, appointment_time, } = value;
    const data = {
      name: name.toString().trim(), birthday: birthday.startOf('day').valueOf(), email: email.trim(), address: address.trim(), phone: Number(phone),
      appointment_time: appointment_time.unix() * 1000,
      photo: photo[0].originFileObj.filepath,
    }
    console.log('data:', data);
    await createPatient(data);
    history.push('/');
  };

  const onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const onPreview = (file) => {
    console.log(file);
  }

  // const onSuccess = (res, file)  =>{
  //   file.filepath = res.filepath;
  //   console.log('onSuccess', res, file);
  // }

  const beforeUpload = file => {
    const isImage = ['image/png', 'image/jpeg', 'image/bmp', 'image/gif', 'image/webp'].includes(file.type);
    if (!isImage) {
      message.error(`${file.name} is not a picture file`);
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    if (!isImage || !isLt5M) return Upload.LIST_IGNORE;
    return true;
  }

  const customRequest = ({
    data,
    file,
    filename,
    onError,
    onProgress,
    onSuccess,
  }) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    uploadFile(formData)
      .then(({ data }) => {
        file.filepath = data.filepath;
        onSuccess(data, file);
      })
      .catch(onError);

    return {
      abort() {
        console.log('upload progress is aborted.');
      },
    };
  }


  const checkPhone = (_, value) => {
    if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(value) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The input is not valid phone number!'));
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className={styles.main}>
      <h1> Register </h1>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[
            {
              required: true,
              message: 'Please input your date of birth!',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { validator: checkPhone },
            {
              required: true,
              message: 'Please input your phone number!'
            },
            
          ]}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ width: '50%' }} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Upload Photo"
          valuePropName="file"
          getValueFromEvent={normFile}
          extra=""
          rules={[
            {
              required: true,
              message: 'Please upload your driver license photo!',
            },
          ]}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            onPreview={onPreview}
            beforeUpload={beforeUpload}
            onChange={onChange}
            // onSuccess={onSuccess}
            customRequest={customRequest}
          >
            {imageUrl ? <img src={imageUrl} alt="photo" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>


        <Form.Item
          name="appointment_time"
          label="Appointment Time"
          rules={[
            {
              required: true,
              message: 'Please input your appointment time!',
            },
          ]}
        >
          <DatePicker
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
            format="YYYY-MM-DD HH:mm"
            />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

