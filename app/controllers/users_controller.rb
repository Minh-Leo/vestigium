class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  def edit; end

  def show

  end

  def update
    @user.update!(user_params)
    if @user.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :password, :photo, :first_name, :last_name, :address)
  end
end
