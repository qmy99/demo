import { connect } from 'dva';
import { Table, Pagination, Form, Row, Col, Input, Button, Select, Modal, Popconfirm, message } from 'antd';
import moment from 'moment';
import { DatePicker, Space } from 'antd';

const Option = Select.Option;
function PersonnelPage(state: any) {
  const [form] = Form.useForm();
  const [Addform] = Form.useForm();
  const [SendMessage] = Form.useForm();
  const params = state.params;
  const { TextArea } = Input;
  const AddParams = state.AddParams;
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '100px',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: '60px',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: '60px',
      render: (sex: any) => {
        return sex == 1 ? '男' : sex == 2 ? '女' : '';
      },
    },
    {
      title: '工作状态',
      dataIndex: 'workStatus',
      key: 'workStatus',
      width: '100px',
      render: (text: any) => {
        return text == 1 ? '离校' : text == 2 ? '在校' : text == 3 ? '在职' : text == 4 ? '离职' : '';
      },
    },
    {
      title: '毕业院校',
      dataIndex: 'school',
      key: 'school',
      width: '140px',
    },
    {
      title: '学历',
      dataIndex: 'education',
      key: 'education',
      width: '90px',
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
      width: '200px',
      render: (text: any) => {
        return state.MajorList.map((item: any) => {
          if (item.key == text) {
            return item.name;
          }
        });
      },
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      width: '120px',
    },
    {
      title: '应聘职位',
      dataIndex: 'position',
      key: 'position',
      width: '200px',
      render: (text: any) => {
        return state.PositionList.map((item: any) => {
          if (item.id == text) {
            return item.positionName;
          }
        });
      },
    },
    {
      title: '邮箱',
      dataIndex: 'Email',
      key: 'Email',
      width: '180px',
    },
    {
      title: '面试时间',
      dataIndex: 'interview',
      key: 'interview',
      width: '180px',
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
                state.dispatch({ type: 'personnel/cancel' });
                state.dispatch({
                  type: 'personnel/Info',
                  payload: { id: row.id },
                });
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="确定删除?"
              onConfirm={() => {
                state.dispatch({
                  type: 'personnel/Delete',
                  payload: { id: row.id },
                });
              }}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 10 }}> 删除 </a>
            </Popconfirm>
            {row.isSend == 0 ? (
              <a
                style={{ marginLeft: 10 }}
                onClick={() => {
                  const list = {
                    name: row.name,
                    sex: row.sex,
                    Email: row.Email,
                    id: row.id,
                  };
                  state.dispatch({
                    type: 'personnel/save',
                    payload: { ShowVisible: true, SendEmail: list },
                  });
                }}
              >
                {' '}
                发送面试邀请{' '}
              </a>
            ) : (
              ''
            )}
          </div>
        );
      },
    },
  ];
  if (state.UpdateParams) {
    form.setFieldsValue(params);
    state.dispatch({ type: 'personnel/save', payload: { UpdateParams: false } });
  }
  if (state.Update) {
    SendMessage.setFieldsValue({ time: [] });
    state.dispatch({ type: 'personnel/save', payload: { Update: false } });
  }
  if (state.UpDateAdd) {
    Addform.setFieldsValue(state.AddParams);
    state.dispatch({ type: 'personnel/save', payload: { UpDateAdd: false } });
  }
  function onChanges(current: any, pageSize: any) {
    params.currentPage = current;
    state.dispatch({ type: 'personnel/save', payload: { params: params } });
    state.dispatch({ type: 'personnel/getList' });
  }
  function changeSize(current: number, pageSize: number) {
    params.currentPage = 1;
    params.perPageRows = pageSize;
    state.dispatch({ type: 'personnel/save', payload: { params: params } });
    state.dispatch({ type: 'personnel/getList' });
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
          type: 'personnel/save',
          payload: { params: newParams },
        });
        state.dispatch({ type: 'personnel/getList' });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
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
          type: 'personnel/UpDate',
          payload: { params: List, id: AddParams.id ? AddParams.id : '' },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  function cancel() {
    state.dispatch({ type: 'personnel/cancel' });
    state.dispatch({
      type: 'personnel/save',
      payload: { Visible: false, UpDateAdd: true },
    });
  }
  function disabledDate(current: any) {
    return current && current < moment().subtract(1, 'days');
  }
  function Showconfirm() {
    SendMessage.validateFields()
      .then((values) => {
        state.dispatch({
          type: 'personnel/SendMessage',
          payload: {
            ...state.SendEmail,
            time: moment(values.time).format('YYYY-MM-DD HH:mm:ss'),
          },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  function ShowCancel() {
    state.dispatch({
      type: 'personnel/save',
      payload: { ShowVisible: false, SendEmail: {} },
    });
  }
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 4,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 20,
      },
      sm: {
        span: 20,
      },
    },
  };
  return (
    <div>
      <div className="contentPanel">
        {/* <div className="PageTitle">人才管理</div> */}
        <div className="searchPanel">
          <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} layout="horizontal">
            <Row>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="姓名" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="年龄" name="age">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="性别" name="sex" initialValue={state.params.sex}>
                  <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false} placeholder="请选择">
                    <Option value="-1" key="-1">
                      全部
                    </Option>
                    <Option value="1" key="1">
                      男
                    </Option>
                    <Option value="2" key="2">
                      女
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="学历" name="education" initialValue={state.params.education}>
                  <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                    <Option value="-1" key="99">
                      全部
                    </Option>
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
                  <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                    {state.MajorList.map((item: any) => (
                      <Option value={item.key} key={item.key}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={12} xl={8} lg={8} sm={24}>
                <Form.Item label="工作状态" name="workStatus" initialValue={state.params.workStatus}>
                  <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                    <Option value="-1" key="99">
                      全部
                    </Option>
                    <Option value="1" key="1">
                      离校
                    </Option>
                    <Option value="2" key="2">
                      在校
                    </Option>
                    <Option value="3" key="3">
                      在职
                    </Option>
                    <Option value="4" key="4">
                      离职
                    </Option>
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
                        education: '-1',
                        sex: '-1',
                        workStatus: '-1',
                        currentPage: 1,
                        perPageRows: 20,
                      };
                      state.dispatch({
                        type: 'personnel/save',
                        payload: { params: List },
                      });
                      state.dispatch({
                        type: 'personnel/save',
                        payload: { UpdateParams: true },
                      });
                    }}
                  >
                    重置
                  </Button>
                  <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      state.dispatch({ type: 'personnel/cancel' });
                      state.dispatch({
                        type: 'personnel/save',
                        payload: { Visible: true, UpDateAdd: true },
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
          <Table scroll={{ x: 1500 }} dataSource={state.DataList.data} bordered rowKey={(record) => record.id} columns={columns} pagination={false} />
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
        title={state.AddParams.id ? '修改' : '新增'}
        onOk={confirm}
        onCancel={cancel}
        width="600px"
        footer={[
          <Button type="primary" onClick={confirm}>
            保存
          </Button>,
          <Button onClick={cancel}>取消</Button>,
        ]}
      >
        <Form form={Addform} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} layout="horizontal">
          <Row>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="姓名" name="name" initialValue={AddParams.name} rules={[{ required: true, message: '请输入您的姓名' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="年龄" name="age" initialValue={AddParams.age} rules={[{ required: true, message: '请输入您的年龄' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="性别" name="sex" initialValue={AddParams.sex}>
                <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                  <Option value="1" key={10}>
                    男
                  </Option>
                  <Option value="2" key={20}>
                    女
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="工作状态" name="workStatus" initialValue={AddParams.workStatus}>
                <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                  <Option value="0" key="0">
                    离校
                  </Option>
                  <Option value="1" key="1">
                    在校
                  </Option>
                  <Option value="2" key="2">
                    在职
                  </Option>
                  <Option value="3" key="3">
                    离职
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="毕业院校" name="school" initialValue={AddParams.school}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="学历" name="education" initialValue={AddParams.education} rules={[{ required: true, message: '请选择学历' }]}>
                <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
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
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="专业" name="specialty" initialValue={AddParams.specialty} rules={[{ required: true, message: '请输入您的专业' }]}>
                <Select dropdownMatchSelectWidth={false} defaultActiveFirstOption={false} filterOption={false}>
                  {state.MajorList.map((item: any) => (
                    <Option value={item.key} key={item.key}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="邮箱" name="Email" initialValue={AddParams.Email} rules={[{ required: true, message: '请输入您的邮箱' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="联系方式" name="phone" initialValue={AddParams.phone} rules={[{ required: true, message: '请输入您的手机号' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xl={12} lg={12} sm={12}>
              <Form.Item label="附件" name="cover" initialValue={AddParams.cover}>
                {/* <Input /> */}
                已上传
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="个人评价" name="selfEvaluation" initialValue={AddParams.selfEvaluation}>
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        visible={state.ShowVisible}
        title="发送邀请"
        onOk={Showconfirm}
        onCancel={ShowCancel}
        width="600px"
        footer={[
          <Button type="primary" onClick={Showconfirm}>
            发送
          </Button>,
          <Button onClick={ShowCancel}>取消</Button>,
        ]}
      >
        <Form form={SendMessage} labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} layout="horizontal">
          <Row>
            <Col span={24}>
              <Form.Item label="时间" name="time" rules={[{ required: true, message: '请选择时间' }]}>
                <DatePicker showTime disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

PersonnelPage.propTypes = {};

function mapStateToProps(state: any) {
  return state.personnel;
}
export default connect(mapStateToProps)(PersonnelPage);
