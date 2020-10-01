class Api::CommentsController < ApplicationController

    def index
        if params[:video_id]
            root_comments = Video.find(params[:video_id]).comments
            @comments = root_comments
            root_comments.each { |comment| @comments.concat(comment.reply_comments) }
        else
            @comments = Comment.find(params[:comment_id]).reply_comments
        end
        render :index
    end

    def show
        @comment = Comment.find(params[:id])
    end

    def create
        @comment = Comment.new(comment_params)
        if params[:video_id]
            @comment.video_id = params[:video_id]
        else
            @comment.parent_id = params[:comment_id]
            parent = Comment.find(params[:comment_id])
            @comment.video_id = parent.video_id
        end
        @comment.author_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.content != comment_params[:content]
            if @comment.update(comment_params)
                render :show
            else
                render json: @comment.errors.full_messages, status: 422
            end
        else
            render :show
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end

    def like
        @like = Like.new(is_like: true, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def unlike
        @like = Like.find_by(is_like: true, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.destroy
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def dislike
        @like = Like.new(is_like: false, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def undislike
        @like = Like.find_by(is_like: false, liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if @like.destroy
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def change_like
        @like = Like.find_by(liker_id: current_user.id, likeable_id: params[:comment_id], likeable_type: "Comment")
        if (@like.is_like)
            @like.is_like = false
        else
            @like.is_like = true
        end
        
        if @like.save
            redirect_to api_comment_url(params[:comment_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :video_id)
    end

end