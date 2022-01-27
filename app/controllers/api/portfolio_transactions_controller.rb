class Api::PortfolioTransactionsController < ApplicationController

  def index
    # @transactions = PortfolioTransaction.where(owner_id: params[:user_id])
    @transactions = PortfolioTransaction.in_interval(params[:user_id], params[:interval])
    @symbols= @transactions.select('symbol').distinct.map(&:symbol)
    render :index
  end
  
  def create
    @transaction = PortfolioTransaction.new(transaction_params)
    if @transaction.save
      @asset = Asset.find_by(id: params[:transaction][:asset_id])
      render '/api/assets/show'
    else
      render json: @transaction.errors.full_messages, status: 404
    end
  end


  private
  def transaction_params
    params.require(:transaction).permit(:asset_id, :owner_id, :is_purchase, :quantity, :transaction_price, :symbol)
  end
end
