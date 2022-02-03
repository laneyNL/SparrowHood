class Api::WatchlistsController < ApplicationController

  def index
    @watchlists = Watchlist.includes(:assets).where(user_id: params[:user_id])
    lists = Watchlist.where(user_id: 41)
    render :index
  end

  def show
    @watchlist = Watchlist.includes(:assets).find_by(id: params[:id])
    if @watchlist 
      render :show
    else
      render json: ['Watchlist does not exist'], status: 404
    end
  end

  def create
    @watchlist = Watchlist.new(watchlist_params)
    if @watchlist.save
      render :show
    else  
      render json: @watchlist.errors.full_messages, status: 404
    end
  end

  def update
    @watchlist = Watchlist.includes(:assets).find_by(id: params[:id])
    if @watchlist && @watchlist.user_id = current_user.id && @watchlist.update(watchlist_params)
      render :show
    else  
      render json: @watchlist.errors.full_messages, status: 404
    end
  end

  def destroy
    @watchlist = Watchlist.find_by(id: params[:id])
    if @watchlist.user_id == current_user.id && @watchlist.destroy
      render json: ['Watchlist deleted'], status: 200
    else  
      render json: @watchlist.errors.full_messages, status: 404
    end
  end

  private
  def watchlist_params
    params.require(:watchlist).permit(:user_id, :name, :icon)
  end
end
