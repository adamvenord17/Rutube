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
        render :index
    end

    private

    def video_params
        params.require(:video).permit(:title, :body, :video_file)
    end

end