import { connect } from 'react-redux';
import { fetchTransactions } from '../../actions/transaction_action';
import { fetchAssetPrice } from '../../actions/asset_actions';
import AssetChart from './asset_chart';

const mapStateToProps = (state) => ({
  assets: state.entities.assets
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTransactions: (userId) => dispatch(fetchTransactions(userId)),
  fetchAssetPrice: (symbol) => dispatch(fetchAssetPrice(symbol))
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetChart);
