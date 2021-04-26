import { connect } from 'dva';
import * as echarts from 'echarts';
function Statistics() {
  if (document.getElementById('main')) {
    const chartDom: any = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    myChart.setOption({
      title: {
        text: '测试',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    });
  }

  // option && myChart.setOption(option);
  return (
    <div>
      <div className="contentPanel">
        <div className="searchPanel">
          <div id="main" style={{ height: '500px', width: '100%' }}></div>
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
