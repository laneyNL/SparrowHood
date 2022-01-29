import { connect } from 'react-redux';
import { fetchAssetFull, fetchCryptoFull, fetchAssetDaily } from '../../actions/asset_actions';
import { createTransaction, fetchTransactions } from '../../actions/transaction_action';
import AssetShow from './asset_show';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.id],
  assets: state.entities.assets.full,
  interval: state.entities.transactions.interval,
  data: state.entities.transactions.symbols,
})

const mapDispatchToProps = dispatch => ({
  fetchAssetFull: (symbol) => dispatch(fetchAssetFull(symbol)),
  fetchCryptoFull: (symbol) => dispatch(fetchCryptoFull(symbol)),
  createTransaction: (transaction) => dispatch(createTransaction(transaction)),
  fetchTransactions: (userId, interval) => dispatch(fetchTransactions(userId, interval)),
  fetchAssetDaily: (symbol) => dispatch(fetchAssetDaily(symbol)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow);
