import React, {FC, useState, useEffect} from 'react';
import {
  Select,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';

const { Option } = Select;

const Viewable: FC = function() {
  const [form] = Form.useForm();
  const [business, setBusiness] = useState([]);
  const [formList, setFormList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listParams, setListParams] = useState({page: 1, pageSize: 10})

  useEffect(() => {
    proxyRequest.get(baseUrl + `/business`, {}).then(function(res: any) {
      if (res) {
        setBusiness(res.data)
      }
    });
  }, []);

  useEffect(() => {
    proxyRequest.get(baseUrl + "/getFormList", listParams)
    .then(function(res: any) {
      if (res && res.code === 0) {
        setFormList(res.data)
      }
    });
  }, [listParams])

  /**
   * 删除表单
   */
  const delForm = (val: any) => {
    proxyRequest.post(baseUrl + "/delForm", {id: val.id})
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('删除成功！');
      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Created_Date',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: '从属业务',
      key: 'remark',
      render: (text: string, record: any) => {
        if (business.length) {
          const cur: any = business.filter((item: any) => item.id === record.fid);
          if (cur.length) {
            return cur[0].name
          }
        }
      }
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          {/* <a>查看</a> */}
          <a>填报</a>
          <a onClick={() => delForm(record)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleChange = (e:any) => {
    proxyRequest.get(baseUrl + "/getFormList", {id: e})
      .then(function(res: any) {
        if (res && res.code === 0) {
          setFormList(res.data)
        }
      });
  }
  /**
   * 新增表单是选择所属业务
   */
  const selectBusinessForAdd = () => {

  }
  /**
   * 新增表单
   */
  const addForm = () => {
    setIsModalVisible(true)
  };
  /**
   * 确认提交表单
   */
  const handleOk = () => {
    form.submit();
    // setIsModalVisible(false);
  };
  /**
   * 取消关闭表单
   */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  }
  /**
   * 提交
   */
  const onFinish = (values: any) => {
    setLoading(true);
    proxyRequest.post(baseUrl + "/addForm", values)
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('新增成功！');
        form.resetFields();
        setLoading(false);
        setIsModalVisible(false);
      }
    });
  }

  return (
    <React.Fragment>
      <Button style={{marginBottom: 12}} onClick={addForm} type="primary">新建</Button>
      <Modal 
        title="新增表单"
        visible={isModalVisible}
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            新增
          </Button>,
        ]}  
      >
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item 
            label="所属业务"
            name="business"
            rules={[{ required: true, message: '请选择所属业务!' }]}
          >
            <Select onChange={selectBusinessForAdd} placeholder="请选择业务">
              {
                business.map((item: any) => {
                  return <Option key={item.id} value={item.key}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="表单名" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入表单名" />
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <Select style={{ width: 120, marginBottom: 12 }} onChange={handleChange} placeholder="请选择业务">
          {
            business.map((item: any) => {
              return <Option key={item.id} value={item.key}>{item.name}</Option>
            })
          }
        </Select>
      </div>
      <Table 
          rowKey={e => e.id}
          columns={columns}
          dataSource={formList}
          size="small"
          bordered
        />
    </React.Fragment>
  )
}

export default Viewable;