class Api::UsersController < ApplicationController

    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def subscribe_to
        @sub = Subscription.new({subscriber_id: current_user.id, creator_id: params[:user_id]})
        if @sub.save
            @user = User.find(params[:user_id])
            render :show
        else
            render json: @sub.errors.full_messages, status: 422
        end
    end

    def unsubscribe_to
        @sub = Subscription.find_by({subscriber_id: current_user.id, creator_id: params[:user_id]})
        @sub.destroy
        @user = User.find(params[:user_id])
        render :show
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end
end