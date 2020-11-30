import React, {FC, useEffect, useState, useRef, useCallback} from 'react';
import { Table, Space, Button, Form, Input, Select, InputNumber, Checkbox, message } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import updateImmutability from 'immutability-helper';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';

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

const Editable: FC = function() {
  const [form] = Form.useForm();
  const [lists, setLists] = useState([]);
  const [update, setUpdate] = useState(false);
  const [controlerType, setControlerType] = useState("");
  const [controlerName, setControlerName] = useState("");
  const [controlerPlaceholder, setControlerPlaceholder] = useState("");
  const [controlerDefaultValue, setControlerDefaultValue] = useState("");

  useEffect(function() {
    proxyRequest.get(baseUrl + `/lists`).then(function(res: any) {
      if (res) {
        setLists(res.data)
      }
    });
  }, [update]);

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      key: 'sort',
      render: (text: any) => text + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'isRequired',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text: any) => text === '1' ? "是" : "否"
    },
    {
      title: 'Placeholder',
      dataIndex: 'placeholder',
      key: 'placeholder',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => delData(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const delData = (record: any) => {
    console.log(record)
    proxyRequest.get(baseUrl + "/delete", {id: record.id})
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('删除成功！');
        setUpdate(!update)
      }
    });
  }

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 },
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
    obj.fid = 1; // TODO:
    proxyRequest.post(baseUrl + "/add", obj)
    .then(function(res: any) {
      if (res.code === 0) {
        message.info('添加成功！');
        form.resetFields();
        setUpdate(!update)
      }
    });
  };

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
    <div>
      {/* 表单 */}
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="业务">
          <span className="ant-form-text">业务1</span>
        </Form.Item>
        <Form.Item 
          label="字段标签"
        >
          <Form.Item name="name" noStyle>
            <Input value={controlerName} placeholder="请输入字段标签" />
          </Form.Item>
        </Form.Item>
        <Form.Item 
          name="field"
          label="字段"
          hasFeedback
          rules={[{required: true, message: "请输入字段"}]}
        >
          <Input placeholder="请输入字段" />
        </Form.Item>
        <Form.Item 
          label="占位提示"
        >
          <Form.Item name="placeholder" noStyle>
            <Input value={controlerPlaceholder} placeholder="请输入占位提示" />
          </Form.Item>
        </Form.Item>
        <Form.Item 
          label="默认值"
        >
          <Form.Item name="defaultValue" noStyle>
            <Input value={controlerDefaultValue} placeholder="请输入默认值" />
          </Form.Item>
        </Form.Item>
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
          </Select>
        </Form.Item>
        {
          ["2", "4"].includes(controlerType)
          ? <Form.Item 
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
          : null
        }
        <Form.Item {...tailFormItemLayout} name="required" valuePropName="checked">
          <Checkbox>
            是否必填
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">新增</Button>
        </Form.Item>
      </Form>
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
  )
}

export default Editable;