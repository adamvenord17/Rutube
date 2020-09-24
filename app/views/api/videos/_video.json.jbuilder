json.extract! video, :id, :title, :body, :uploader_id, :video_file
json.video_file url_for(video.video_file)