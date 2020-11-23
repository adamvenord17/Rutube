class Api::VideosController < ApplicationController

    def index
        # debugger
        if params[:bounds] 
            @videos = Video.with_attached_video_file.within_search_params(params[:bounds])
        elsif params[:userId]
            @videos = Video.with_attached_video_file.where(uploader_id: params[:userId])
        elsif params[:likerId]
            @videos = User.find(params[:likerId]).liked_videos
        else
            @videos = Video.with_attached_video_file.all
        end
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
            if (params[:tags])
                tags = params[:tags][:tag_names].split(',')
                tags.each do |tag|
                    existing_tag = Tag.find_by(tag_name: tag)
                    if existing_tag
                        TagJoin.create!({video_id: Video.last.id, tag_id: existing_tag.id})
                    else
                        Tag.create!({tag_name: tag})
                        TagJoin.create!({video_id: Video.last.id, tag_id: Tag.last.id})
                    end
                end
            end
            render :show
        else
            render json: @video.errors.full_messages, status: 422
        end
    end

    def update
        @video = Video.find(params[:id])
        if @video.update_attributes(video_params)
            prevTags = @video.tag_names
            newTags = params[:tags][:tag_names]
            tags_to_delete = prevTags.select { |tag| !newTags.include?(tag) }
            tags_to_create = newTags.select { |tag| !prevTags.include?(tag) }
            tags_to_delete.each { |tag| TagJoin.find_by(video_id: @video.id, tag_id: Tag.find_by(tag_name: tag)).destroy }
            tags_to_create.each do |tag|
                existing_tag = Tag.find_by(tag_name: tag)
                if existing_tag
                    TagJoin.create!({video_id: @video.id, tag_id: existing_tag.id})
                else
                    Tag.create!({tag_name: tag})
                    TagJoin.create!({video_id: @video.id, tag_id: Tag.last.id})
                end
            end
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
        last_view = View.where(ip_address: request.remote_ip).where(video_id: params[:video_id])
        if last_view[0]
            if ((Time.now - last_view.last.created_at) > 30)
                @view = View.new(ip_address: request.remote_ip, video_id: params[:video_id])
                if @view.save
                    redirect_to api_video_url(params[:video_id])
                else
                    render json: @view.errors.full_messages, status: :unprocessable_entity
                end
            else
                redirect_to api_video_url(params[:video_id])
            end
        else
            @view = View.new(ip_address: request.remote_ip, video_id: params[:video_id])
            if @view.save
                redirect_to api_video_url(params[:video_id])
            else
                render json: @view.errors.full_messages, status: :unprocessable_entity
            end
        end
    end

    private

    def video_params
        params.require(:video).permit(:title, :body, :video_file)
    end

end