import { connect } from 'dva';
import {
  Table,
  Pagination,
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Modal,
  Popconfirm,
  message,
  DatePicker,
} from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

function Position(state: any) {
  // const [form] = Form.useForm();
  const [Addform] = Form.useForm();
  const [SendMessage] = Form.useForm();
  const { TextArea } = Input;
  const AddParams = state.AddParams;
  const [form] = Form.useForm();
  const params = state.params;
  const columns = [
    {
      title: '岗位名称',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: '薪资范围',
      dataIndex: 'pay',
      key: 'pay',
    },
    {
      title: '学历要求',
      dataIndex: 'education',
      key: 'education',
      render: (text: any) => {
        return text == 100
          ? '初中及以下'
          : text == 101
          ? '中专'
          : text == 102
          ? '高中'
          : text == 103
          ? '大专'
          : text == 104
          ? '本科'
          : text == 105
          ? '研究生'
          : text == 106
          ? '博士'
          : text == 107
          ? '其他'
          : '';
      },
    },
    {
      title: '专业',
      dataIndex: 'specialty',
      key: 'specialty',
      render: (text: any) => {
        return state.MajorList.map((item: any) => {
          if (item.key == text) {
            return item.name;
          }
        });
      },
    },
    {
      title: '拟招聘人数',
      dataIndex: 'recruitNum',
      key: 'recruitNum',
    },
    {
      title: '操作',
      width: '220px',
      render: (row: any) => {
        return (
          <div>
            <a
              style={{ marginLeft: 10 }}
              onClick={() => {
                state.dispatch({ type: 'position/cancel' });
                state.dispatch({
                  type: 'position/save',
                  payload: { AddParams: row, Visible: true, Update: true },
                });
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                state.dispatch({
                  type: 'position/Delete',
                  payload: { id: row.id },
                });
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
    form.setFieldsValue(params);
    Addform.setFieldsValue(state.AddParams);
    SendMessage.setFieldsValue({ time: [] });
    state.dispatch({ type: 'position/save', payload: { Update: false } });
  }
  function onChanges(current: any, pageSize: any) {
    params.currentPage = current;
    state.dispatch({ type: 'position/save', payload: { params: params } });
    state.dispatch({ type: 'position/getList' });
  }
  function changeSize(current: number, pageSize: number) {
    params.currentPage = 1;
    params.perPageRows = pageSize;
    state.dispatch({ type: 'position/save', payload: { params: params } });
    state.dispatch({ type: 'position/getList' });
  }
  function getList() {
    form
      .validateFields()
      .then((values) => {
        const List: any = {};
        for (let item in values) {
          if (values[item]) {
            List[item] = values[item];
          }
        }
        let newParams = Object.assign(params, List);
        newParams.currentPage = 1;
        state.dispatch({
          type: 'position/save',
          payload: { params: newParams },
        });
        state.dispatch({ type: 'position/getList' });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }

  function cancel() {
    // state.dispatch({ type: 'position/cancel'})
    state.dispatch({
      type: 'position/save',
      payload: { Visible: false, Update: true },
    });
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
        state.dispatch({
          type: 'position/UpDate',
          payload: { params: List, id: AddParams.id ? AddParams.id : '' },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <div>
      <div className="contentPanel">
        <div className="searchPanel">
          <Form
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 17 }}
            layout="horizontal"
          >
            <Row>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="岗位名称" name="positionName">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="薪资范围" name="pay">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="学历要求" name="education">
                  <Select
                    dropdownMatchSelectWidth={false}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    <Option value="100" key="100">
                      初中及以下
                    </Option>
                    <Option value="101" key="101">
                      中专
                    </Option>
                    <Option value="102" key="102">
                      高中
                    </Option>
                    <Option value="103" key="103">
                      大专
                    </Option>
                    <Option value="104" key="104">
                      本科
                    </Option>
                    <Option value="105" key="105">
                      研究生
                    </Option>
                    <Option value="106" key="106">
                      博士
                    </Option>
                    <Option value="107" key="107">
                      其他
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="专业" name="specialty">
                  <Select
                    dropdownMatchSelectWidth={false}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                  >
                    {state.MajorList.map((item: any) => (
                      <Option value={item.key} key={item.key}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" onClick={() => getList()}>
                    查询
                  </Button>
                  <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      form.resetFields();
                      var List = {
                        currentPage: 1,
                        perPageRows: 20,
                      };
                      state.dispatch({
                        type: 'position/save',
                        payload: { params: List },
                      });
                    }}
                  >
                    重置
                  </Button>
                  <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      state.dispatch({ type: 'position/cancel' });
                      state.dispatch({
                        type: 'position/save',
                        payload: { Visible: true, Update: true },
                      });
                    }}
                  >
                    新增
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            dataSource={state.DataList.data}
            bordered
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Pagination
            showQuickJumper
            defaultPageSize={20}
            pageSizeOptions={['20', '50', '100']}
            defaultCurrent={state.params.current}
            total={state.DataList.total}
            showSizeChanger
            current={state.params.currentPage}
            onChange={onChanges}
            onShowSizeChange={changeSize}
          />
        </div>
      </div>
      <Modal
        visible={state.Visible}
        title={state.AddParams.id ? '岗位编辑' : '岗位新增'}
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
        <Form form={Addform} {...formItemLayout} layout="horizontal">
          <Row>
            <Col span={24}>
              <Form.Item
                label="岗位名称"
                name="positionName"
                initialValue={AddParams.positionName}
                rules={[{ required: true, message: '请输入岗位名称' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="薪资范围"
                name="pay"
                initialValue={AddParams.pay}
                rules={[{ required: true, message: '请输入薪资范围' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="学历要求"
                name="education"
                initialValue={AddParams.education}
                rules={[{ required: true, message: '请选择学历' }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                >
                  <Option value="100" key="100">
                    初中及以下
                  </Option>
                  <Option value="101" key="101">
                    中专
                  </Option>
                  <Option value="102" key="102">
                    高中
                  </Option>
                  <Option value="103" key="103">
                    大专
                  </Option>
                  <Option value="104" key="104">
                    本科
                  </Option>
                  <Option value="105" key="105">
                    研究生
                  </Option>
                  <Option value="106" key="106">
                    博士
                  </Option>
                  <Option value="107" key="107">
                    其他
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="专业"
                name="specialty"
                initialValue={AddParams.specialty}
                rules={[{ required: true, message: '请输入您的专业' }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                >
                  {state.MajorList.map((item: any) => (
                    <Option value={item.key + ''} key={item.key}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="拟招聘人数"
                name="recruitNum"
                initialValue={AddParams.recruitNum}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="任职要求"
                name="requirements"
                initialValue={AddParams.requirements}
              >
                <TextArea autoSize />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

Position.propTypes = {};

function mapStateToProps(state: any) {
  return state.position;
}
export default connect(mapStateToProps)(Position);
