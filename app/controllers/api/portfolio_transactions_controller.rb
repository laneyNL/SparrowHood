class Api::PortfolioTransactionsController < ApplicationController

  def index
    @transactions = PortfolioTransaction.in_interval(params[:user_id], params[:interval])
    @assets= PortfolioTransaction.where(owner_id: params[:user_id]).select('symbol').distinct.map(&:symbol)
    @interval = params[:interval]
    @average_prices = PortfolioTransaction.group('symbol').average(:transaction_price)
    render :index
  end
  
  def create
    @transaction = PortfolioTransaction.new(transaction_params)

    if @transaction.save
      @asset= PortfolioTransaction.where(owner_id: @transaction.owner_id, symbol: @transaction.symbol).select('symbol').distinct.map(&:symbol)
      @quantity = PortfolioTransaction.where(symbol: @transaction.symbol).sum('quantity')
      @average_price = PortfolioTransaction.where(symbol: @transaction.symbol, is_purchase: true).average(:transaction_price)
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
