class Api::AssetsController < ApplicationController
  def show
    @asset = Asset.find_by(id: params[:id]);
    if @asset
      render :show
    else
      render json: ["This asset does not exist"], status 404
    end
  end
end
