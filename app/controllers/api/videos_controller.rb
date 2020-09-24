class Api::VideosController < ApplicationController

    def index
        @videos = Video.all
        render :index
    end

    def show
        @video = Video.find(params[:id])
        render :show
    end

    def create
        debugger
        @video = Video.new(video_params)
        debugger
        @video.uploader_id = current_user.id
        if @video.save
            render :show
        else
            render json: @post.errors.full_messages
        end
    end

    def update
        @video = Video.find(params[:id])
        if @video.update_attributes(video_params)
            render :show
        else
            render json: @post.errors.full_messages
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