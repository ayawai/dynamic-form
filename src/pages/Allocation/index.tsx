import React, {FC, useEffect, useState, useRef, useCallback} from 'react';
import { Table, Space, Button, Form, Input, Select, Row, Col, Checkbox, message, Divider, Tooltip } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import updateImmutability from 'immutability-helper';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';
import { useLocation } from 'react-router-dom';
import Layouts from '../../Layout'
import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';

const Option = Select.Option;
const RNDContext = createDndContext(HTML5Backend);
const type = 'DragableBodyRow';

const DragableBodyRow = (value: { [x: string]: any; index: any; moveRow: any; className: any; style: any; }) => {
  const { index, moveRow, className, style, ...restProps } = value;
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref as any}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const Allocation: FC = function(props) {
  let location = useLocation();
  const [form] = Form.useForm();
  const [lists, setLists] = useState([]);
  const [listParams, setListParams] = useState({page: 1, pageSize: 30});
  const [update, setUpdate] = useState(false);
  const [business, setBusiness] = useState([]);
  const [controlerType, setControlerType] = useState("");
  const [controlerName, setControlerName] = useState("");
  const [controlerPlaceholder, setControlerPlaceholder] = useState("");
  const [controlerDefaultValue, setControlerDefaultValue] = useState("");
  const [formId, setFormId] = useState("");

  useEffect(function() {
    const query = new URLSearchParams(location.search);
    const fId = query.get("formId")
    let pa = JSON.parse(JSON.stringify(listParams));
    if (fId) {
      pa.formId = fId;
      setFormId(fId)
    }
    proxyRequest.get(baseUrl + `/lists`, pa).then(function(res: any) {
      if (res) {
        setLists(res.data)
      }
    });
  }, [listParams, update]);

  useEffect(function() {
    proxyRequest.get(baseUrl + `/business`, {}).then(function(res: any) {
      if (res) {
        setBusiness(res.data)
      }
    });
    
  }, [])

  const columns = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      render: (text: any) => text + 1,
    },
    {
      title: '控件名',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => (
        <Button
          size="small"
          type="link"
        >
          {text}
        </Button>
      )
    },
    {
      title: '控件类型',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '是否必填',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text: any) => text === '1' ? "是" : "否"
    },
    {
      title: '提示占位符',
      dataIndex: 'placeholder',
      key: 'placeholder',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip title="删除">
            <Button 
              danger
              onClick={() => delData(record)}
              shape="circle"
              size="small"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const delData = (record: any) => { 
    proxyRequest.get(baseUrl + "/delete", {id: record.id})
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('删除成功！');
        setUpdate(!update)
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 6,
        offset: 0,
      },
      sm: {
        span: 6,
        offset: 2,
      },
    },
  };
  
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    let obj: any = {}
    Object.keys(values).forEach(item => {
      if (values[item]) {
        obj[item] = values[item]
      }
      if (values.required) {
        obj.required = '1'
      }
    })
    obj.sort = lists.length;
    obj.formId = formId;
    proxyRequest.post(baseUrl + "/add", obj)
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('添加成功！');
        form.resetFields();
        setUpdate(!update)
      }
    });
  };

  // const handleChange = (e:any) => {
   
  // }

  const changeSelect = (value: string, option: any) => {
    setControlerType(value)
  }

  const components = {
    body: {
      row: (vaue: any) => DragableBodyRow(vaue),
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = lists[dragIndex];
      const originRow: any = lists[dragIndex];
      const targetRow: any = lists[hoverIndex];
      const param = {
        originId: originRow.id,
        originSort: originRow.sort,
        targetId: targetRow.id,
        targetSort: targetRow.sort
      }
      proxyRequest.post(baseUrl + "/sort", param)
      .then(function(res: any) {
        if (res.code === 0) {
          message.info('OK！');
          setUpdate(!update)
          setLists(
            updateImmutability(lists, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
              ],
            }),
          );
        }
      });
    },
    [lists, update],
  );

  const manager = useRef(RNDContext);

  return (
    <Layouts>
      <div style={{background: "#fff", padding: 15, marginBottom: 20}}>
        {/* 表单 */}
        <Divider orientation="left">控件属性</Divider>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
        >
          <Row>
            {/* <Col span={8}>
              <Form.Item label="业务">
                <Select onChange={handleChange} placeholder="请选择业务">
                  {
                    business.map((item: any) => {
                      return <Option key={item.id} value={item.key}>{item.name}</Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item 
                label="字段标签"
              >
                <Form.Item name="name" noStyle>
                  <Input value={controlerName} placeholder="请输入字段标签" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="field"
                label="字段"
                hasFeedback
                rules={[{required: true, message: "请输入字段"}]}
              >
                <Input placeholder="请输入字段" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                label="占位提示"
              >
                <Form.Item name="placeholder" noStyle>
                  <Input value={controlerPlaceholder} placeholder="请输入占位提示" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                label="默认值"
              >
                <Form.Item name="defaultValue" noStyle>
                  <Input value={controlerDefaultValue} placeholder="请输入默认值" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="select"
                label="表单控件"
                hasFeedback
                rules={[{ required: true, message: '请选择控件类型!' }]}
              >
                <Select onChange={changeSelect} placeholder="请选择控件类型">
                  <Option value="3">数字</Option>
                  <Option value="1">文本</Option>
                  <Option value="2">下拉选择</Option>
                  <Option value="4">单选按钮</Option>
                  <Option value="5">纯文本</Option>
                </Select>
              </Form.Item>  
            </Col>
            {
              ["2", "4"].includes(controlerType)
              ? (
                <Col span={8}>
                  <Form.Item 
                    label="控件选项"
                  >
                    <Form.Item 
                      name="options"
                      noStyle
                      hasFeedback
                      rules={[{ required: true, message: '请输入选项' }]}
                    >
                      <Input placeholder="输入选项并用'/'隔开" />
                      {/* <Input addonAfter={<PlusOutlined />} placeholder="输入选项并用'/'隔开" /> */}
                    </Form.Item>
                  </Form.Item>
                </Col>
              )
              : null
            }
            <Col span={8}>
              <Form.Item {...tailFormItemLayout} name="required" valuePropName="checked">
                <Checkbox>
                  是否必填
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">新增</Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{background: "#fff", padding: 15}}>
        <DndProvider manager={manager.current.dragDropManager as any}>
          <Table 
            rowKey={e => e.id}
            columns={columns}
            dataSource={lists}
            size="small"
            bordered
            components={components}
            onRow={(record, index): any => ({
              index,
              moveRow,
            })}
          />
        </DndProvider>
      </div>
    </Layouts>
  )
}

export default Allocation;