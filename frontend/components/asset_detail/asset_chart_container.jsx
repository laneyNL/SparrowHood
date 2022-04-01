import { connect } from 'react-redux';
import { createTransaction } from '../../actions/transaction_action';
import AssetChart from './asset_chart';

const mapStateToProps = (state, ownProps) => {
    return {
      assets: state.entities.assets,
      symbolDetails: state.entities.transactions.symbols,
      symbol: ownProps.symbol,
      name: ownProps.name,
    }
  }

const mapDispatchToProps = dispatch => ({
  createTransaction: (transaction) => dispatch(createTransaction(transaction)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetChart);
