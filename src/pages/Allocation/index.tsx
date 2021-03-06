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
      title: '??????',
      dataIndex: 'sort',
      key: 'sort',
      render: (text: any) => text + 1,
    },
    {
      title: '?????????',
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
      title: '????????????',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '????????????',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text: any) => text === '1' ? "???" : "???"
    },
    {
      title: '???????????????',
      dataIndex: 'placeholder',
      key: 'placeholder',
    },
    {
      title: '??????',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip title="??????">
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
        message.info('???????????????');
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
        message.info('???????????????');
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
          message.info('OK???');
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
        {/* ?????? */}
        <Divider orientation="left">????????????</Divider>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
        >
          <Row>
            {/* <Col span={8}>
              <Form.Item label="??????">
                <Select onChange={handleChange} placeholder="???????????????">
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
                label="????????????"
              >
                <Form.Item name="name" noStyle>
                  <Input value={controlerName} placeholder="?????????????????????" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="field"
                label="??????"
                hasFeedback
                rules={[{required: true, message: "???????????????"}]}
              >
                <Input placeholder="???????????????" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                label="????????????"
              >
                <Form.Item name="placeholder" noStyle>
                  <Input value={controlerPlaceholder} placeholder="?????????????????????" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                label="?????????"
              >
                <Form.Item name="defaultValue" noStyle>
                  <Input value={controlerDefaultValue} placeholder="??????????????????" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="select"
                label="????????????"
                hasFeedback
                rules={[{ required: true, message: '?????????????????????!' }]}
              >
                <Select onChange={changeSelect} placeholder="?????????????????????">
                  <Option value="3">??????</Option>
                  <Option value="1">??????</Option>
                  <Option value="2">????????????</Option>
                  <Option value="4">????????????</Option>
                  <Option value="5">?????????</Option>
                </Select>
              </Form.Item>  
            </Col>
            {
              ["2", "4"].includes(controlerType)
              ? (
                <Col span={8}>
                  <Form.Item 
                    label="????????????"
                  >
                    <Form.Item 
                      name="options"
                      noStyle
                      hasFeedback
                      rules={[{ required: true, message: '???????????????' }]}
                    >
                      <Input placeholder="??????????????????'/'??????" />
                      {/* <Input addonAfter={<PlusOutlined />} placeholder="??????????????????'/'??????" /> */}
                    </Form.Item>
                  </Form.Item>
                </Col>
              )
              : null
            }
            <Col span={8}>
              <Form.Item {...tailFormItemLayout} name="required" valuePropName="checked">
                <Checkbox>
                  ????????????
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">??????</Button>
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