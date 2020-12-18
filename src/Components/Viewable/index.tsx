import React, {FC, useState, useEffect} from 'react';
import {
  Input,
  Form,
  Radio,
  InputNumber,
  Select,
  Button,
  message,
  Row,
  Col,
} from 'antd';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';

const { Option } = Select;

const Viewable: FC = function() {

  let [lists, setLists] = useState([]);

  useEffect(() => {
    proxyRequest.get(baseUrl + `/lists`, {}).then(function(res: any) {
      if (res) {
        setLists(res.data)
      }
    });

  }, []);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    values.fid = 1;
    proxyRequest.post(baseUrl + "/save", values)
      .then(function(res: any) {
        if (res && res.code === 0) {
          message.info('保存成功！');
        }
      });
  };

  return (
    <div>
      <Form
        name="validate_other"
        // {...formItemLayout}
        onFinish={onFinish}
      >
        {/* <Form.Item label="业务">
          <span className="ant-form-text">业务1</span>
        </Form.Item> */}
        {/* <Row gutter={24}>{getFields()}</Row> */}
        <Row gutter={24}>
        {
              lists.map(function(item: any) {
                let options = [];
                if (item.options) {
                  options = item.options.split("/");
                }
                // 
                let rules = [];
                if (item.isRequired === '1') {
                  rules.push({
                    required: true, 
                    message: item.placeholder
                  })
                }
                //
                if (item.code === "1") {
                  return (
                    <Col span={8} key={item.id}>
                      <Form.Item
                        initialValue={item.default_value}
                        name={item.field}
                        rules={rules}
                        label={item.name}
                      >
                        <Input placeholder={item.placeholder} />
                      </Form.Item>
                    </Col>
                  )
                }
                if (item.code === "2") {
                  return (
                    <Col span={8} key={item.id}>
                      <Form.Item
                        name={item.field}
                        label={item.name}
                        hasFeedback
                        initialValue={item.default_value}
                        rules={rules}
                      >
                        <Select placeholder={item.placeholder}>
                          {
                            options.map((v:string, k:number) => {
                            return <Option key={k} value={k}>{v}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  )
                }
                if (item.code === "3") {
                  return (
                    <Col span={8} key={item.id}>
                      <Form.Item label={item.name}>
                        <Form.Item name={item.field} rules={rules} initialValue={item.default_value} noStyle>
                          <InputNumber placeholder={item.placeholder} min={1} max={10} />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  )
                }
                if (item.code === "4") {
                  return (
                    <Col span={8} key={item.id}>
                      <Form.Item name={item.field} initialValue={item.default_value} rules={rules} label={item.name}>
                        <Radio.Group>
                          {
                            options.map((v:string, k:number) => {
                            return <Radio key={k} value={k}>{v}</Radio>
                            })
                          }
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  )
                }
                return null
              })
            }
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Viewable;