import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import moment from 'moment';
import color from 'client/utils/color';
import styles from './index.module.less';

const status = {
  1: {
    color: color.green,
    text: 'SALE',
  },
  2: {
    color: color.yellow,
    text: 'REJECT',
  },
  3: {
    color: color.red,
    text: 'TAX',
  },
  4: {
    color: color.blue,
    text: 'EXTENDED',
  },
};

function RecentSales({ data }) {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      render: text => moment(new Date(text)).format('YYYY-MM-DD'),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text, it) => (
        <span style={{ color: status[it.status].color }}>${text}</span>
      ),
    },
  ];
  return (
    <div className={styles.recentsales}>
      <Table
        pagination={false}
        columns={columns}
        rowKey={(record, key) => key}
        dataSource={data.filter((item, key) => key < 5)}
      />
    </div>
  );
}

RecentSales.propTypes = {
  data: PropTypes.array,
};

export default RecentSales;
