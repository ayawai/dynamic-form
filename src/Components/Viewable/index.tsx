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
  Divider,
  Table
} from 'antd';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';
import history from 'history/browser';
import {v4 as uuidv4} from 'uuid';

const { Option } = Select;

const Viewable: FC = function() {

  let [lists, setLists] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  let [formInfo, setFormInfo] = useState({name: ""});
  const [update, setUpdate] = useState(false);
  const [formId, setFormId] = useState("");
  const [listParams, setListParams] = useState({page: 1, pageSize: 30});

  // useEffect(() => {
  //   if (formId) {
  //     proxyRequest.get(baseUrl + `/getFormInfo`, {id: formId}).then(function(res: any) {
  //       if (res) {
  //         setFormInfo(res.data)
  //       }
  //     });
  //   }
  // }, [formId])

  useEffect(() => {
    const {search = ""} = history.location;
    let pa = JSON.parse(JSON.stringify(listParams));
    if (search) {
      const q1 = search.split("?");
      if (q1.length > 1) {
        // TODO: 支持一个参数formId
        const q2 = q1[1].split("=");
        if (q2.length > 1) {
          pa.formId = q2[1];
          setFormId(q2[1])
        }
      }
    }

    if (formId) {

      new Promise<void>((resolve, reject) => {
        proxyRequest.get(baseUrl + `/lists`, pa).then(function(res: any) {
          if (res) {
            setLists(res.data)
            resolve()
          }
        })
      })
      .then(() => {
        proxyRequest.get(baseUrl + `/getFormData`, {id: formId}).then(function(res: any) {
          let tempArr: string[] = [], newArr: any = [];
          if (res) {
            
            for (let i = 0; i < res.data.length; i++) {
              const rowId = res.data[i].row_id;
              
              if (tempArr.indexOf(rowId) === -1) {
                tempArr.push(rowId);
              }

              let index = tempArr.indexOf(rowId);
  
              if (index >= 0) {
                newArr[index] = newArr[index] || {rowId};

                newArr[index][res.data[i].field_name] = res.data[i].value;
              }
            }
            
            setDataSource(newArr)
          }
        });
      })
      
      proxyRequest.get(baseUrl + `/getFormInfo`, {id: formId}).then(function(res: any) {
        if (res) {
          setFormInfo(res.data)
        }
      });

    }
  }, [formId, listParams, update])

  // useEffect(() => {
  //   const {search = ""} = history.location;
  //   let pa = JSON.parse(JSON.stringify(listParams));
  //   if (search) {
  //     const q1 = search.split("?");
  //     if (q1.length > 1) {
  //       // TODO: 支持一个参数formId
  //       const q2 = q1[1].split("=");
  //       if (q2.length > 1) {
  //         pa.formId = q2[1];
  //         setFormId(q2[1])
  //       }
  //     }
  //   }
  //   proxyRequest.get(baseUrl + `/lists`, pa).then(function(res: any) {
  //     if (res) {
  //       setLists(res.data)
  //     }
  //   });

  // }, [listParams]);

  const onFinish = (values: any) => {
    values.formId = formId;
    values.uuid = uuidv4();
    proxyRequest.post(baseUrl + "/save", values)
      .then(function(res: any) {
        if (res && res.code === 0) {
          message.info('保存成功！');
          setUpdate(!update)
        }
      });
  };

  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
  }

  const handleDelData = (e: any) : void => {
    proxyRequest.post(baseUrl + "/delData", {id: e.rowId})
    .then(function(res: any) {
      if (res && res.code === 0) {
        message.info('删除成功！');
        setUpdate(!update)
      }
    });
  }

  interface Action {
    title: string;
    key: string;
    dataIndex?: string;
    render?: (s: string, r: any) => any
  }
  const columns = lists.map((item: any): Action => {
    return {
      title: item.name,
      dataIndex: item.field,
      key: item.id,
    }
  }).concat({
    title: "操作", 
    key: "action",
    render: (text, record) => {
      return <a onClick={() => handleDelData(record)}>删除</a>
    }
  })

  return (
    <div>
      <div style={{background: "#fff", padding: "12px 15px", marginBottom: 20}}>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Row gutter={24}>
          {
                lists.map(function(item: any) {
                  let options = [];
                  if (item.options) {
                    options = item.options.split("/");
                  }
                  // 
                  let rules: any[] = [];
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
                            <InputNumber style={{width: "100%"}} placeholder={item.placeholder} min={0} />
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
                  if (item.code === "5") {
                    return (
                      <Col span={8} key={item.id}>
                        <Form.Item label={item.name}>
                          <span className="ant-form-text">纯文本</span>
                        </Form.Item>
                      </Col>
                    )
                  }
                  return null
                })
              }
          </Row>
          <Row>
            <Col span={24}>
              <Button type="primary" style={{float: "right"}} htmlType="submit">提交</Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div style={{background: "#fff", padding: "12px 15px"}}>
        <Divider style={{marginBottom: 30, fontSize: 20}}>{formInfo.name}</Divider>
        <Table 
          rowKey={(e: any) => e.rowId}
          columns={columns}
          dataSource={dataSource}
          size="small"
          bordered
        />
      </div>
    </div>
  )
}

export default Viewable;