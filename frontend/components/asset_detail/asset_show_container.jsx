import { connect } from 'react-redux';
import { fetchAssetFull, fetchCryptoFull, fetchAssetInterval, fetchCryptoInterval } from '../../actions/asset_actions';
import { createTransaction, fetchTransactions } from '../../actions/transaction_action';
import AssetShow from './asset_show';

const mapStateToProps = (state, ownProps) => ({
  user: state.entities.users[state.session.id],
  assets: state.entities.assets,
  // interval: state.entities.transactions.interval,
  symbolDetails: state.entities.transactions.symbols,
})

const mapDispatchToProps = dispatch => ({
  fetchAssetFull: (symbol) => dispatch(fetchAssetFull(symbol)),
  fetchCryptoFull: (symbol) => dispatch(fetchCryptoFull(symbol)),
  fetchAssetInterval: (symbol) => dispatch(fetchAssetInterval(symbol)),
  fetchCryptoInterval: (symbol) => dispatch(fetchCryptoInterval(symbol)),
  createTransaction: (transaction) => dispatch(createTransaction(transaction)),
  fetchTransactions: (userId, interval) => dispatch(fetchTransactions(userId, interval)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow);
