class Api::WatchlistsController < ApplicationController

  def index
    @watchlists = Watchlist.where(user_id: params[:user_id]).include(:assets)
    render :index
  end

  def show
    @watchlist = Watchlist.find_by(id: params[:id])
    render :show
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
    @watchlist = Watchlist.find_by(id: params[:id])
    if @watchlist && @watchlist.user_id = current_user.id && @watchlist.update(watchlist_params)
      render :show
    else  
      render json: @watchlist.errors.full_messages, status: 404
    end
  end

  def destroy
    @watchlist = Watchlist.find_by(id: params[:id])
    if @watchlist.user_id = current_user.id && @watchlist.destroy
      render :show
    else  
      render json: @watchlist.errors.full_messages, status: 404
  end

  private
  def watchlist_params
    params.require(:watchlist).permit(:user_id, :name)
  end
end
