import {connect} from "dva"

function Statistics() {
  return (
    <div>
      <div className="contentPanel">
        <div className="searchPanel">
          统计管理
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