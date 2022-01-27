import { connect } from 'react-redux';
import { fetchAssetInterval, fetchAssetDaily, fetchAssetWeekly } from '../../actions/asset_actions';
import AssetChart from './asset_chart';

const mapStateToProps = (state) => ({
  assets: state.entities.assets
})

const mapDispatchToProps = dispatch => ({
  fetchAssetInterval: (symbol) => dispatch(fetchAssetInterval(symbol)),
  fetchAssetDaily: (symbol) => dispatch(fetchAssetDaily(symbol)),
  fetchAssetWeekly: (symbol) => dispatch(fetchAssetWeekly(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetChart);
