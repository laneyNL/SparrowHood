class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ["Unable to log in with provided credentials."], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user 
      logout!
      render json: { message: 'Logout successful.'}
    else
      render json: ['User not signed in'], status: 404
    end
  end
end
