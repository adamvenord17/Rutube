class Api::VideosController < ApplicationController

    def index
        @videos = Video.with_attached_video_file.all
        render :index
    end

    def show
        @video = Video.with_attached_video_file.find(params[:id])
        render :show
    end

    def create
        @video = Video.new(video_params)
        @video.uploader_id = current_user.id
        if @video.save
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def update
        @video = Video.find(params[:id])
        if @video.update_attributes(video_params)
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def destroy
        @video = Video.find(params[:id])
        @video.destroy
    end
    
    def like
        @like = Like.new(is_like: true, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def unlike
        @like = Like.find_by(is_like: true, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.destroy
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def dislike
        @like = Like.new(is_like: false, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def undislike
        @like = Like.find_by(is_like: false, liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if @like.destroy
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    def change_like
        @like = Like.find_by(liker_id: current_user.id, likeable_id: params[:video_id], likeable_type: "Video")
        if (@like.is_like)
            @like.is_like = false
        else
            @like.is_like = true
        end
        
        if @like.save
            redirect_to api_video_url(params[:video_id])
        else
            render json: @like.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def video_params
        params.require(:video).permit(:title, :body, :video_file)
    end

end