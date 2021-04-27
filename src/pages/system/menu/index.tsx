import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Select, Modal, DatePicker, Tree } from 'antd';
const Option = Select.Option;
function MenuPage(state: any) {
  const [Addform] = Form.useForm();
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];
  function confirm() {
    Addform.validateFields()
      .then((values) => {
        const List: any = {};
        for (let item in values) {
          if (values[item]) {
            List[item] = values[item];
          }
        }

        let newParams = Object.assign(state.MenuParams, List);
        state.dispatch({ type: 'MenuPage/SaveDate', payload: { params: newParams } });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
    state.dispatch({ type: 'MenuPage/save', payload: { Visible: false } });
  }
  function cancel() {
    state.dispatch({ type: 'MenuPage/save', payload: { Visible: false } });
  }
  console.log(state.List);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              state.dispatch({ type: 'MenuPage/save', payload: { Visible: true } });
            }}
          >
            新增
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Tree treeData={state.List} />
        </Col>
      </Row>
      <Modal
        visible={state.Visible}
        title={state.id ? '岗位编辑' : '岗位新增'}
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
  );
}

MenuPage.propTypes = {
  // WebApi
};

function mapStateToProps(state: any) {
  return state.MenuPage;
}
export default connect(mapStateToProps)(MenuPage);
