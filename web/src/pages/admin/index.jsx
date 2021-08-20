
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'umi';

import ProTable from '@ant-design/pro-table';
import { Image } from 'antd';

import { queryPatients } from '@/services/patient';


export default function Page() {

  const actionRef = useRef();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      hideInForm: true,
      sorter: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      valueType: 'date',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      sorter: true,
      hideInForm: true,
    },
    {
      title: 'appointment_time',
      dataIndex: 'appointment_time',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'photo',
      dataIndex: 'photo',
      render: (_, r) => {
        return (
          r.photo ? <Image width={100} src={BASE_URL + r.photo} /> : ''
        )
      }
    },
  ]

  return (
    <div>
      <h1>Admin Page</h1>

      <ProTable
        rowKey="ID"
        actionRef={actionRef}
        search={false}
        request={(params, sorter, filter) => queryPatients({ ...params, sorter, filter })}
        columns={columns}
      />

    </div>
  );
}
