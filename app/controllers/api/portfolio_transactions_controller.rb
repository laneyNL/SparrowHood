class Api::PortfolioTransactionsController < ApplicationController

  def index
    @transactions = PortfolioTransaction.in_interval(params[:user_id], params[:interval])

    allTransactions = PortfolioTransaction.where(owner_id: params[:user_id])
    @symbols= allTransactions.select('symbol').distinct.map(&:symbol)
    @quantities= allTransactions.group('symbol').sum('quantity')
    @average_prices= allTransactions.group('symbol').average(:transaction_price)

    @interval = params[:interval]
    render :index
  end
  
  def create
    @transaction = PortfolioTransaction.new(transaction_params)

    if @transaction.save
      transations = PortfolioTransaction.where(owner_id: @transaction.owner_id, symbol: @transaction.symbol)
      @asset= transations.select('symbol').distinct.map(&:symbol)
      @quantity = transations.sum('quantity')
      @average_price = transations.where(is_purchase: true).average(:transaction_price)
      render :show
    else
      render json: @transaction.errors.full_messages, status: 404
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:owner_id, :is_purchase, :quantity, :transaction_price, :symbol)
  end
end
