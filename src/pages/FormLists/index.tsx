import React, {FC, useState, useEffect} from 'react';
import {
  Select,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Col
} from 'antd';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';
import { useHistory } from 'react-router-dom';
import Layouts from '../../Layout'

const { Option } = Select;

interface listsPageProps {
  contentCode: string;
  switchTab: any;
}

const ListsPage: FC = function(prop) {
  const history = useHistory();
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
    handleGetFormList(listParams)
  }, [listParams])


  const handleGetFormList = (p: any) => {
    proxyRequest.get(baseUrl + "/getFormList", p)
    .then(function(res: any) {
      if (res && res.code === 0) {
        setFormList(res.data)
      }
    });
  }
  /**
   * 删除表单
   */
  const delForm = (val: any) => {
    const pa = JSON.parse(JSON.stringify(listParams));
    // pa.id = val.id;
    proxyRequest.post(baseUrl + "/delForm", {id: val.id})
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('删除成功！');
        handleGetFormList(pa);
      }
    });
  };

  const handleAllocation = (record: any) => {
    history.push('/allocation?formId='+ record.id)
  }

  const handleInput = (record: any) => {
    history.push('/view?formId='+ record.id)
  }

  const handleEditRow = (val: any) => {
    console.log(val)
    setIsModalVisible(true);
  }

  const columns = [
    {
      title: '表单名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Button 
          size="small"
          onClick={() => handleEditRow(record)}
          type="link"
        >
          {text}
        </Button>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: '所属业务',
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleAllocation(record)}>配置</a>
          <a onClick={() => handleInput(record)}>填报</a>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => delForm(record)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleChange = (e:any) => {
    const pa = JSON.parse(JSON.stringify(listParams));
    pa.id = e;
    proxyRequest.get(baseUrl + "/getFormList", pa)
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
        handleGetFormList(listParams);
      }
    });
  }

  return (
    <React.Fragment>
      <Layouts>
        <div style={{background: "#fff", padding: 15, marginBottom: 20}}>
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="按业务">
                  <Select style={{ width: 120, marginBottom: 12 }} onChange={handleChange} placeholder="请选择业务">
                    {
                      business.map((item: any) => {
                        return <Option key={item.id} value={item.key}>{item.name}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    // form.resetFields();
                  }}
                >
                  Clear
                </Button>
                {/* <a
                  style={{ fontSize: 12 }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                </a> */}
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{padding: 15, background: "#fff"}}>
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
          <Table 
            rowKey={e => e.id}
            columns={columns}
            dataSource={formList}
            size="small"
            bordered
          />
        </div>
      </Layouts>
      </React.Fragment>
  )
}

export default ListsPage;