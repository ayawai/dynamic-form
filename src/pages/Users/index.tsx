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
  Table,
  Tree
} from 'antd';
import { baseUrl } from '../../utils/baseServer';
import proxyRequest from '../../utils/request';
import { useLocation } from 'react-router-dom';
import Layouts from '../../Layout'
import {v4 as uuidv4} from 'uuid';

const { Option } = Select;
const { Search } = Input;

const Users: FC = function() {

  let location = useLocation();
  let [lists, setLists] = useState([]);
  let [dataSource, setDataSource] = useState([]);
  let [formInfo, setFormInfo] = useState({name: ""});
  const [update, setUpdate] = useState(false);
  const [formId, setFormId] = useState("");
  const [listParams, setListParams] = useState({page: 1, pageSize: 30});
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState([]);

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
    const query = new URLSearchParams(location.search);
    const fId = query.get("formId")
    let pa = JSON.parse(JSON.stringify(listParams));
    if (fId) {
      pa.formId = fId;
      setFormId(fId)
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

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false)
  };

  const x = 3;
  const y = 2;
  const z = 1;
  const gData: Array<string> = [];

  const generateData = (_level: number, _preKey: string, _tns: any) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;
  
    const children: string[] = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: key, key });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  };
  generateData(z, '0', null);

  const dataList: any = [];
  const generateList = (data: Array<string>) => {
    for (let i = 0; i < data.length; i++) {
      const node: any = data[i];
      const { key } = node;
      dataList.push({ key, title: key });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(gData);

  const getParentKey: any = (key: any, tree: string | any[]) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: { key: any; }) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onChangeSearch = (e:any) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item: { title: string | any[]; key: any; }) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item: any, i: any, self: string | any[]) => item && self.indexOf(item) === i);

      setExpandedKeys(expandedKeys);
      setAutoExpandParent(false);
      setSearchValue(value);
  };

  const loop: any = (data: Array<string>) =>
      data.map((item: any) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });

  return (
    <Layouts>
      <Row>
        <Col span={6}>
          <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={onChangeSearch} />
          <Tree
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={loop(gData)}
          />
        </Col>
        <Col span={18}>
          content
        </Col>
      </Row>
    </Layouts>
  )
}

export default Users;