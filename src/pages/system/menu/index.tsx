import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Select, Modal, Table, Popconfirm } from 'antd';
const Option = Select.Option;
function MenuPage(state: any) {
  const [Addform] = Form.useForm();
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '菜单Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '操作',
      width: '220px',
      render: (text: any, record: any, index: number) => {
        return (
          <div>
            <a
              style={{ marginLeft: 10 }}
              onClick={() => {
                var List = { id: record.key, pid: record.pid, name: record.title, url: record.url };
                state.dispatch({ type: 'MenuPage/save', payload: { MenuParams: List, Update: true, Visible: true } });
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                state.dispatch({ type: 'MenuPage/delRow', payload: { id: record.key } });
              }}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 10 }}> 删除 </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  if (state.Update) {
    Addform.setFieldsValue(state.MenuParams);
    state.dispatch({ type: 'MenuPage/save', payload: { Update: false } });
  }
  function confirm() {
    Addform.validateFields()
      .then((values) => {
        const List: any = {};
        for (let item in values) {
          if (values[item]) {
            List[item] = values[item];
          }
        }
        List.pid ? List.pid : state.MenuParams.pid;
        state.dispatch({ type: 'MenuPage/SaveDate', payload: { params: List, id: state.MenuParams.id } });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  function cancel() {
    state.dispatch({ type: 'MenuPage/save', payload: { Visible: false } });
  }

  function Formatting(data: any) {
    var List: any = [];
    data.map((item: any) => {
      if (item.children && item.children.length > 0) {
        List.push(item);
      } else {
        List.push({ key: item.key, title: item.title, url: item.url, pid: item.pid });
      }
    });
    return List;
  }
  return (
    <div className="contentPanel">
      <div className="searchPanel">
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => {
                //
                state.dispatch({ type: 'MenuPage/cancel' });
                state.dispatch({ type: 'MenuPage/save', payload: { Visible: true, Update: true } });
              }}
            >
              新增
            </Button>
          </Col>
        </Row>
        <div style={{ marginTop: 20 }}>
          <Table columns={columns} dataSource={Formatting(state.List)} />
        </div>
        <Modal
          visible={state.Visible}
          title={state.MenuParams.id ? '岗位编辑' : '岗位新增'}
          onOk={confirm}
          onCancel={cancel}
          width="500px"
          footer={[
            <Button type="primary" onClick={confirm}>
              保存
            </Button>,
            <Button onClick={cancel}>取消</Button>,
          ]}
        >
          <Form form={Addform} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} layout="horizontal">
            <Row>
              <Col span={24}>
                <Form.Item label="父节点" name="pid" initialValue={state.MenuParams.pid} rules={[{ required: true, message: '请选择父节点' }]}>
                  <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                    <Option value={0} key={0}>
                      顶级菜单
                    </Option>
                    {state.SelectList.map((item: any) => {
                      return (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="节点名称" name="name" initialValue={state.MenuParams.name} rules={[{ required: true, message: '请输入节点名称' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="菜单URL" name="url" initialValue={state.MenuParams.url} rules={[{ required: true, message: '请输入菜单URL' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

MenuPage.propTypes = {
  // WebApi
};

function mapStateToProps(state: any) {
  return state.MenuPage;
}
export default connect(mapStateToProps)(MenuPage);
