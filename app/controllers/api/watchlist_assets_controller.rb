class Api::WatchlistAssetsController < ApplicationController

  def create
    @asset = WatchlistAsset.new(asset_params)
    if @asset.save
      render :show
    else  
      render json: @watchlist.errors.full_messages, status: 404
    end
  end

  def destroy
    @asset = WatchlistAsset.find_by(id: params[:id])
    if @asset.destroy
      render :show
    else  
      render json: @asset.errors.full_messages, status: 404
    end
  end

  private
  def assets_params
    params.require(:watchlist_assets).permit(:watchlist_id, :symbol)
  end
end
