class Api::CommentsController < ApplicationController

    def index
        @comments = Video.find(params[:video_id]).comments
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.video_id = params[:video_id]
        @comment.author_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :video_id)
    end

end