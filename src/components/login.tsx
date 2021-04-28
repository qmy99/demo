import React from 'react';
import styles from './login.css';
//import logo from '../assets/logo.png';
import { connect } from 'dva';
import { Layout, Form, Row, Col, Input, Button, Checkbox } from 'antd';
const Item = Form.Item;
const { Header, Content } = Layout;
function Login(state: any) {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  function Login() {
    form
      .validateFields()
      .then((values) => {
        state.dispatch({ type: 'login/login', payload: { username: values.username, password: values.password } });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  return (
    <div className={styles.bg}>
      <div className={styles.center}>
        <Header className={styles.header}>
          <Row>
            <Col span={30}>
              <p>人才需求信息检索系统</p>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          <Row>
            <Col className={styles.left}>
              <h3>账号登录</h3>
              <Form {...layout} form={form}>
                <Item label="用户名" name="username" rules={[{ required: true, message: '请输入您的用户名' }]}>
                  <Input autoComplete="new-password" />
                </Item>

                <Item label="密码" name="password" rules={[{ required: true, message: '请输入您的密码' }]}>
                  <Input.Password placeholder={'请输入密码'} autoComplete="new-password" />
                </Item>
                <Item {...tailLayout}>
                  <Button
                    type="primary"
                    onClick={() => {
                      Login();
                    }}
                  >
                    登录
                  </Button>
                </Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </div>
    </div>
  );
}

Login.propTypes = {};

function mapStateToProps(state: any) {
  return state.login;
}
export default connect(mapStateToProps)(Login);
