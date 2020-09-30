class Api::VideosController < ApplicationController

    def index
        @videos = params[:bounds] ? Video.with_attached_video_file.within_search_params(params[:bounds]) : Video.with_attached_video_file.all
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

    def add_view
        if logged_in?

            last_view = View.where(user_id: current_user.id)
            debugger
            if last_view
                if ((Time.now - last_view.last.created_at) > 30)
                    @view = View.new(user_id: current_user.id, video_id: params[:video_id])
                    if @view.save
                        redirect_to api_video_url(params[:video_id])
                    else
                        render json: @view.errors.full_messages, status: :unprocessable_entity
                    end
                end
            else
                @view = View.new(user_id: current_user.id, video_id: params[:video_id])
                if @view.save
                    redirect_to api_video_url(params[:video_id])
                else
                    render json: @view.errors.full_messages, status: :unprocessable_entity
                end
            end
        end
    end

    private

    def video_params
        params.require(:video).permit(:title, :body, :video_file)
    end

end