import { connect } from 'dva';
import { Form, Row, Col, Button, Select } from 'antd';
import * as echarts from 'echarts';
const Option = Select.Option;
function Statistics(state: any) {
  const [form] = Form.useForm();
  function init(NameList: any, DataList: any) {
    const chartDom: any = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    myChart.setOption({
      title: {
        text: '测试',
      },
      xAxis: {
        type: 'category',
        data: NameList,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: DataList,
          type: 'line',
        },
      ],
    });
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
        state
          .dispatch({ type: 'Statistics/getList', payload: { key: List.key } })
          .then((res: any) => {
            const NameList: any[] = [];
            const DataList: any[] = [];
            res.map((item: any, index: number) => {
              if (index < 10) {
                NameList.push(item.type);
                DataList.push(item.const);
              }
            });
            init(NameList, DataList);
          });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  }
  return (
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
              <Form.Item
                label="统计类型"
                name="key"
                initialValue=""
                rules={[{ required: true, message: '请输入统计类型' }]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                >
                  <Option value="age" key="100">
                    年龄
                  </Option>
                  <Option value="education" key="101">
                    学历
                  </Option>
                  <Option value="specialty" key="102">
                    专业
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} xl={16} lg={16} sm={24}>
              <Form.Item>
                <Button type="primary" onClick={() => getList()}>
                  查询
                </Button>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div id="main" style={{ height: '500px' }}>
          {' '}
        </div>
      </div>
    </div>
  );
}

Statistics.propTypes = {};

function mapStateToProps(state: any) {
  return state.Statistics;
}

export default connect(mapStateToProps)(Statistics);
